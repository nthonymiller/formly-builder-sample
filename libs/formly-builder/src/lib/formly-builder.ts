import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction } from './types';

export type Obj = { [key: string]: any };

export interface Builder {
  build(): any;
}

export class FieldBuilder<T> implements Builder {

  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  constructor(public key: T) { }

  public build(): FormlyFieldConfig {
    // Todo: Include operations from withProps

    return { key: this.key as unknown as string };
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): FieldBuilder<T> {
    this.operations = operations;
    return this;
  }
}


export abstract class GroupBuildBase<T extends Obj = any> {

  protected _builders: Array<any> = [];

  public field<K extends keyof T>(key: K): FieldBuilder<any> {
    return this.addBuilder(new FieldBuilder(key));
  }

  public withFields<R extends Builder, K = this>(project: (value: K) => R[]): GroupBuildBase {
    this.addBuilder(project);
    return this;
  }

  public group<K extends keyof T>(key: K): GroupBuilder<T[K]> {
    return this.addBuilder(new GroupBuilder<T[K]>(key));
  }

  protected addBuilder<U>(value: U): U {
    this._builders.push(value);
    return value;
  }

  abstract build(): any;

}

export class GroupBuilder<T extends Obj = any> extends GroupBuildBase<T> implements Builder {

  private operations: MonoTypeOperatorFunction<FormlyFieldConfig>[];

  constructor(public key: string | number | any) {
    super()
  }

  public build(): FormlyFieldConfig {
    // Todo: Include operations from withProps

    const fieldGroup = buildGroup(this, this._builders);
    const result: FormlyFieldConfig = { key: this.key, fieldGroup };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldConfig>[]): GroupBuilder<T> {
    this.operations = operations;
    return this;
  }
}


export class FormlyBuilder<T extends Obj = any> extends GroupBuildBase<T> implements Builder {

  public build(): FormlyFieldConfig[] {
    return buildGroup(this, this._builders);
  }

}

export function buildGroup(current: Builder, builders: Array<any>): FormlyFieldConfig[] {
  const result = [];

  builders.forEach(builder => {
    if (builder instanceof Function) {
      const projectorBuilders = builder(current) as Array<Builder>;
      result.push(...projectorBuilders.map(f => f.build()));
    } else {
      result.push(builder.build());
    }
  });

  return result;
}