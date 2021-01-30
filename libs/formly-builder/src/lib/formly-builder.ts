import { FormlyFieldConfig } from '@ngx-formly/core';
import { pipeFromArray } from './pipe';
import { MonoTypeOperatorFunction } from './types';

export type Obj = { [key: string]: any };

export interface Builder<T> {
  build(): T;
}

export class FieldBuilder<T> implements Builder<FormlyFieldConfig> {

  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  constructor(public key: T) { }

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyFieldConfig>(this.operations)(props);
    }

    let result = {
      ...props,
      key: this.key as unknown as string
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): FieldBuilder<T> {
    this.operations = operations;
    return this;
  }
}


export abstract class GroupBuildBase<T extends Obj> {

  protected _builders: Array<any> = [];

  public field<K extends keyof T>(key: K): FieldBuilder<any> {
    return this.addBuilder(new FieldBuilder(key));
  }

  public withFields<R extends Builder<any>, K = this>(project: (value: K) => R[]): GroupBuildBase<T> {
    this.addBuilder(project);
    return this;
  }

  public group<K extends keyof T>(key: K): GroupBuilder<T[K]> {
    return this.addBuilder(new GroupBuilder<T[K]>(key));
  }

  public layout(): LayoutBuilder<T> {
    return this.addBuilder(new LayoutBuilder<T>());
  }

  abstract build(): any;

  protected addBuilder<U>(value: U): U {
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
        result.push(builder.build());
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


export class FormlyBuilder<T extends Obj = any> extends GroupBuildBase<T> implements Builder<FormlyFieldConfig[]> {

  public build(): FormlyFieldConfig[] {
    return this.buildGroup(this, this._builders);
  }

}
