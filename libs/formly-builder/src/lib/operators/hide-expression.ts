import { FormlyFieldConfig } from '@ngx-formly/core';

export function hideExpression(value: boolean | string | ((model: any, formState: any, field?: FormlyFieldConfig) => boolean)) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      hideExpression: value
    };
  }
}