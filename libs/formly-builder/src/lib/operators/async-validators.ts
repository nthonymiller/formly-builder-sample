import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps, PropType } from '../types';

export function asyncValidators<U = PropType<FormlyFieldConfig, 'asyncValidators'>>(value: U) {
  return (configuration: FormlyFieldProps): FormlyFieldProps => {
    return {
      ...configuration,
      asyncValidators: value
    };
  }
}