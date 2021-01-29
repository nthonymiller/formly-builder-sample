import { FormlyFieldConfig } from '@ngx-formly/core';

export function hiddenField(hide: boolean = true) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      hide
    };
  }
}