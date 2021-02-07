import { FormlyFieldConfig } from '@ngx-formly/core';
import { pipeFromArray } from '../pipe';
import { ArrayProperties, ArrayPropertyType, MonoTypeOperatorFunction, Obj } from '../types';
import { ArrayBuilder } from './array-builder';
import { Builder } from './builder';
import { FieldBuilder } from './field-builder';
import { TemplateBuilder } from './template-builder';


export type ProjectorFn<R extends Builder<any>, K extends GroupBuilderBase<any>> = (value: K) => R[];

/** GroupBuilderBase is an abstract base class add common functionality used by GroupBuilder, LayoutBuilder and FormlyBuilder */
export abstract class GroupBuilderBase<T extends Obj> {

  protected _builders: Array<any> = [];

  public field<K extends keyof T>(key: K): FieldBuilder<K> {
    const result = new FieldBuilder<K>(key);
    this.add(result)
    return result;
  }

  public withFields<R extends Builder<any>, K extends GroupBuilderBase<T>>(project: ProjectorFn<R, K>): this {
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

  public add<U extends Builder<FormlyFieldConfig | FormlyFieldConfig[]> | ProjectorFn<Builder<any>, GroupBuilderBase<any>>>(value: U): this {
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

  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  constructor(public key: string | number | any) {
    super()
  }

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyFieldConfig>(this.operations)(props);
    }

    const fieldGroup = this.buildGroup();

    const result: FormlyFieldConfig = {
      ...props,
      key: this.key,
      fieldGroup
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): this {
    this.operations = operations;
    return this;
  }
}

/** LayoutBuilder handles layouts, by grouping nodes in the tree. This builder has no key as such
 * does not add anything to the model structure */
export class LayoutBuilder<T> extends GroupBuilderBase<T> {

  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyFieldConfig>(this.operations)(props);
    }

    const fieldGroup = this.buildGroup();

    const result: FormlyFieldConfig = {
      ...props,
      fieldGroup
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): this {
    this.operations = operations;
    return this;
  }
}