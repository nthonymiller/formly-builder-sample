import { FormlyFieldConfig } from '@ngx-formly/core';
import { pipeFromArray } from '../pipe';
import { MonoTypeOperatorFunction, Obj } from '../types';
import { Builder } from './builder';
import { FieldBuilder } from './field-builder';
import { TemplateBuilder } from './template-builder';


export type ProjectorFn<R extends Builder<any>, K extends GroupBuildBase<any>> = (value: K) => R[];


export abstract class GroupBuildBase<T extends Obj> {

  protected _builders: Array<any> = [];

  public field<K extends keyof T>(key: K): FieldBuilder<K> {
    const result = new FieldBuilder<K>(key);
    this.add(result)
    return result;
  }

  public withFields<R extends Builder<any>, K extends GroupBuildBase<T>>(project: ProjectorFn<R, K>): this {
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

  abstract build(): any;

  public add<U extends Builder<FormlyFieldConfig | FormlyFieldConfig[]> | ProjectorFn<Builder<any>, GroupBuildBase<any>>>(value: U): this {
    this._builders.push(value);
    return this;
  }

  protected buildGroup<T>(current: Builder<T>, builders: Array<any>): FormlyFieldConfig[] {
    const result = [];

    builders.forEach(builder => {
      if (builder instanceof Function) {
        const projectorBuilders = builder(current) as Array<Builder<any>>;
        result.push(...projectorBuilders.map(f => f.build()));
      } else {
        const config = builder.build();
        Array.isArray(config) ? result.push(...config) : result.push(config);
      }
    });

    return result;
  }
}

export class GroupBuilder<T extends Obj> extends GroupBuildBase<T> implements Builder<FormlyFieldConfig> {

  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  constructor(public key: string | number | any) {
    super()
  }

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyFieldConfig>(this.operations)(props);
    }

    const fieldGroup = this.buildGroup(this, this._builders);

    const result: FormlyFieldConfig = {
      ...props,
      key: this.key,
      fieldGroup
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): GroupBuilder<T> {
    this.operations = operations;
    return this;
  }
}

export class LayoutBuilder<T> extends GroupBuildBase<T> {

  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyFieldConfig>(this.operations)(props);
    }

    const fieldGroup = this.buildGroup(this, this._builders);

    const result: FormlyFieldConfig = {
      ...props,
      fieldGroup
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): LayoutBuilder<T> {
    this.operations = operations;
    return this;
  }
}