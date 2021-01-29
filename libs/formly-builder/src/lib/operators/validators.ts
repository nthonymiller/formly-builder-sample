import { FormlyFieldConfig } from '@ngx-formly/core';

// Todo: Make this strongly typed.
export function validators(value: any) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      validators: value
    };
  }
}