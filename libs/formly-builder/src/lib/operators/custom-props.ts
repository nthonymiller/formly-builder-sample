import { FormlyFieldConfig } from '@ngx-formly/core';

export function customProps<T extends {}>(value: T) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        ...value
      }
    };
  }
}