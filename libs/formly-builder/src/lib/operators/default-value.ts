import { FormlyFieldConfig } from '@ngx-formly/core';

export function defaultValue<T>(value: T) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      defaultValue: value
    };
  }
}