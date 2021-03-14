import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction } from '../types';

export function defaultValue<T extends Pick<FormlyFieldConfig, 'defaultValue'>, U>(value: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      defaultValue: value
    };
  }
}