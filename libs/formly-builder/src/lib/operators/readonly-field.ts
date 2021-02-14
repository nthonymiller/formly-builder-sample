import { FormlyFieldConfig } from '@ngx-formly/core';

export function readonlyField(value: boolean = true) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        readonly: value
      }
    };
  }
}