import { FormlyFieldConfig } from '@ngx-formly/core';

export function required() {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        required: true
      }
    };
  }
}