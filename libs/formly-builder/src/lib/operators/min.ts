import { FormlyFieldConfig } from '@ngx-formly/core';

export function min(value: number) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        min: value
      }
    };
  }
}