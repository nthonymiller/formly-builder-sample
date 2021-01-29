import { FormlyFieldConfig } from '@ngx-formly/core';

export function label(value: string) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        label: value
      }
    };
  }
}