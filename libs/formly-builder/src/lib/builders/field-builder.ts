import { FormlyFieldConfig } from '@ngx-formly/core';
import { pipeFromArray } from '../pipe';
import { FormlyFieldProps, MonoTypeOperatorFunction } from '../types';
import { Builder } from './builder';


/** FieldBuilder defines a field in the node tree with the specified key */
export class FieldBuilder<T> implements Builder<FormlyFieldConfig> {

  private operations: MonoTypeOperatorFunction<FormlyFieldProps>[];

  constructor(public key: T) { }

  public build(): FormlyFieldConfig {
    let props = {};
    if (this.operations?.length > 0) {
      props = pipeFromArray<FormlyFieldProps>(this.operations)(props);
    }

    let result = {
      ...props,
      key: this.key as unknown as string
    };
    return result;
  }

  withProps(...operations: MonoTypeOperatorFunction<FormlyFieldProps>[]): this {
    this.operations = operations;
    return this;
  }
}