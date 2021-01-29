import { FormlyFieldConfig } from '@ngx-formly/core';

export function fieldType(type: string) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      type
    };
  }
}