import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps, PropType } from '../types';

export function validators<U = PropType<FormlyFieldConfig, 'validators'>>(value: U) {
  return (configuration: FormlyFieldProps): FormlyFieldProps => {
    return {
      ...configuration,
      validators: value
    };
  }
}