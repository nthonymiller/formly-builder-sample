import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction, PropType } from '../types';

export function validators<T extends Pick<FormlyFieldConfig, 'validators'>, U = PropType<FormlyFieldConfig, 'validators'>>(value: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      validators: value
    };
  };
}