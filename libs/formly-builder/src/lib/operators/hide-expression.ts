import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction, PropType } from '../types';

export function hideExpression<T extends Pick<FormlyFieldConfig, 'hideExpression'>, U = PropType<FormlyFieldConfig, 'hideExpression'>>(value: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      hideExpression: value
    };
  };
}