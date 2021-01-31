import { FormlyFieldConfig } from '@ngx-formly/core';
import { pipeFromArray } from '../pipe';
import { MonoTypeOperatorFunction } from '../types';
import { Builder } from './builder';

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