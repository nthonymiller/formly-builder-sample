import { FormlyFieldConfig } from '@ngx-formly/core';

export function focusField(focus: boolean = true) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      focus
    };
  }
}