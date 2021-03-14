import { FormlyFieldConfig } from '@ngx-formly/core';

export function focusField(focus: boolean = true) {
  return <T extends Pick<FormlyFieldConfig, 'focus'>>(configuration: T): T => {
    return {
      ...configuration,
      focus
    };
  }
}