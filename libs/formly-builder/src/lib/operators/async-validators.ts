import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction, PropType } from '../types';

export function asyncValidators<T extends Pick<FormlyFieldConfig, 'asyncValidators'>, U = PropType<FormlyFieldConfig, 'asyncValidators'>>(value: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      asyncValidators: value
    };
  }
}