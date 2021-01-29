import { FormlyFieldConfig } from '@ngx-formly/core';

export function max(value: number) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        max: value
      }
    };
  }
}