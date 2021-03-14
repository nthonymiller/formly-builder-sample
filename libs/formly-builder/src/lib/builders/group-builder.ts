import { FormlyFieldConfig } from '@ngx-formly/core';
import { pipeFromArray } from '../pipe';
import { ArrayProperties, ArrayPropertyType, ObjectType, PrimitiveType, MonoTypeOperatorFunction, Obj, PrimitiveOrObject, FormlyGroupProps, FormlyLayoutProps } from '../types';
import { Builder } from './builder';
import { FieldBuilder } from './field-builder';
import { TemplateBuilder } from './template-builder';


export type BuildProjectorFn<R extends Builder<any>, K> = (value: K) => R[];

/** GroupBuilderBase is an abstract base class add common functionality used by GroupBuilder, LayoutBuilder and FormlyBuilder */
export abstract class GroupBuilderBase<T extends Obj> {

  protected _builders: Array<any> = [];

  public field<K extends keyof T>(key: K): FieldBuilder<K> {
    const result = new FieldBuilder<K>(key);
    this.add(result)
    return result;
  }

  public withFields<R extends Builder<any>, K extends GroupBuilderBase<T>>(project: BuildProjectorFn<R, K>): this {
    this.add(project);
    return this;
  }

  public group<K extends keyof T>(key: K): GroupBuilder<T[K]> {
    const result = new GroupBuilder<T[K]>(key);
    this.add(result);
    return result;
  }

  public layout(): LayoutBuilder<T> {
    const result = new LayoutBuilder<T>();
    this.add(result)
    return result;
  }

  public template(template: string): TemplateBuilder {
    const result = new TemplateBuilder(template);
    this.add(result);
    return result;
  }

  public array<K extends keyof ArrayProperties<T>>(key: K): ArrayBuilder<ArrayPropertyType<T[K]>> {
    const result = new ArrayBuilder<ArrayPropertyType<T[K]>>(key);
    this.add(result);
    return result;
  }

  abstract build(): any;

  public add<U extends Builder<FormlyFieldConfig | FormlyFieldConfig[]> | BuildProjectorFn<Builder<any>, GroupBuilderBase<any>>>(value: U): this {
    this._builders.push(value);
    return this;
  }

  protected buildGroup<T>(): FormlyFieldConfig[] {
    const result = [];

    this._builders.forEach(builder => {
      if (builder instanceof Function) {
        const projectorBuilders = builder(this) as Array<Builder<any>>;
        result.push(...projectorBuilders.map(f => f.build()));
      } else {
        const config = builder.build();
        Array.isArray(config) ? result.push(...config) : result.push(config);
      }
    });

    return result;
  }
}

/** GroupBuilder handles complex object node in the tree */
export class GroupBuilder<T extends Obj> extends GroupBuilderBase<T> implements Builder<FormlyFieldConfig> {

  private operations: MonoTypeOperatorFunction<FormlyGroupProps>[];

  constructor(public key: string | number | any) {
    super()
  }

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyGroupProps>(this.operations)(props);
    }

    const fieldGroup = this.buildGroup();

    const result: FormlyFieldConfig = {
      ...props,
      key: this.key,
      fieldGroup
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyGroupProps>[]): this {
    this.operations = operations;
    return this;
  }
}

/** LayoutBuilder handles layouts, by grouping nodes in the tree. This builder has no key as such
 * does not add anything to the model structure */
export class LayoutBuilder<T> extends GroupBuilderBase<T> {

  private operations: MonoTypeOperatorFunction<FormlyLayoutProps>[];

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyLayoutProps>(this.operations)(props);
    }

    const fieldGroup = this.buildGroup();

    const result: FormlyFieldConfig = {
      ...props,
      fieldGroup
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyLayoutProps>[]): this {
    this.operations = operations;
    return this;
  }
}

export class ArrayGroupBuilder<T extends Obj> implements Builder<FormlyFieldConfig> {

  protected _builders: Array<any> = [];
  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  public field<K extends keyof T>(key: K): FieldBuilder<K> {
    const result = new FieldBuilder<K>(key);
    this.add(result)
    return result;
  }

  public withFields<R extends Builder<any>, K extends ArrayGroupBuilder<T>>(project: BuildProjectorFn<R, K>): this {
    this.add(project);
    return this;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): this {
    this.operations = operations;
    return this;
  }

  // Can this be done with an array??
  public layout(): LayoutBuilder<T> {
    const result = new LayoutBuilder<T>();
    this.add(result)
    return result;
  }

  public template(template: string): TemplateBuilder {
    const result = new TemplateBuilder(template);
    this.add(result);
    return result;
  }

  public add<U extends Builder<FormlyFieldConfig | FormlyFieldConfig[]> | BuildProjectorFn<Builder<any>, ArrayGroupBuilder<any>>>(value: U): this {
    this._builders.push(value);
    return this;
  }

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyFieldConfig>(this.operations)(props);
    }

    const fieldGroup: FormlyFieldConfig[] = [];
    this._builders.forEach(builder => {
      if (builder instanceof Function) {
        const projectorBuilders = builder(this) as Array<Builder<any>>;
        fieldGroup.push(...projectorBuilders.map(f => f.build()));
      } else {
        const config = builder.build();
        Array.isArray(config) ? fieldGroup.push(...config) : fieldGroup.push(config);
      }
    });

    const result: FormlyFieldConfig = {
      ...props,
      fieldGroup
    };
    return result;
  }
}

export class ArrayBuilder<T extends PrimitiveOrObject> implements Builder<FormlyFieldConfig> {

  protected _builder: Builder<any>;
  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  constructor(public key: string | number | any) { }

  // How to restrict this if T is Obj ?? What about dates ??
  public field<U extends PrimitiveType<T>>(key: string | number | any): FieldBuilder<U> {
    const result = new FieldBuilder<U>(key);
    this.add(result)
    return result;
  }

  public group<U extends ObjectType<T>>(): ArrayGroupBuilder<U> {
    const result = new ArrayGroupBuilder<U>();
    this.add(result);
    return result;
  }

  public add<U extends Builder<FormlyFieldConfig | FormlyFieldConfig[]>>(value: U): this {
    if (this._builder != null) {
      console.warn('Only a single builder is allowed in ArrayBuild, replacing existing builder.');
    }
    this._builder = value;
    return this;
  }

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyFieldConfig>(this.operations)(props);
    }

    let fieldArray: FormlyFieldConfig = this._builder.build();

    const result: FormlyFieldConfig = {
      ...props,
      key: this.key,
      fieldArray
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): this {
    this.operations = operations;
    return this;
  }
}