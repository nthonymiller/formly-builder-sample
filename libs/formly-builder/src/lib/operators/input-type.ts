import { FormlyFieldConfig } from '@ngx-formly/core';

export function inputType(value: string) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        type: value
      }
    };
  }
}