import { FormlyFieldConfig } from '@ngx-formly/core';
import { pipeFromArray } from '../pipe';
import { MonoTypeOperatorFunction, Obj } from '../types';
import { Builder } from './builder';
import { FieldBuilder } from './field-builder';
import { TemplateBuilder } from './template-builder';


export type ProjectorFn<R extends Builder<any>, K extends GroupBuildBase<any>> = (value: K) => R[];


export abstract class GroupBuildBase<T extends Obj> {

  protected _builders: Array<any> = [];

  public field<K extends keyof T>(key: K): FieldBuilder<any> {
    return this.add(new FieldBuilder(key));
  }

  public withFields<R extends Builder<any>, K extends GroupBuildBase<T>>(project: ProjectorFn<R, K>): GroupBuildBase<T> {
    this.add(project);
    return this;
  }

  public group<K extends keyof T>(key: K): GroupBuilder<T[K]> {
    return this.add(new GroupBuilder<T[K]>(key));
  }

  public layout(): LayoutBuilder<T> {
    return this.add(new LayoutBuilder<T>());
  }

  public template(template: string): TemplateBuilder {
    return this.add(new TemplateBuilder(template));
  }

  abstract build(): any;

  public add<U extends Builder<FormlyFieldConfig | FormlyFieldConfig[]> | ProjectorFn<Builder<any>, GroupBuildBase<any>>>(value: U): U {
    this._builders.push(value);
    return value;
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