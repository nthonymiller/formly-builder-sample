import { FormlyFieldConfig } from '@ngx-formly/core';

export function minLength(value: number) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        minLength: value
      }
    };
  }
}