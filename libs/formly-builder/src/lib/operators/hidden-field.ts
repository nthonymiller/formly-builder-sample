import { FormlyFieldConfig } from '@ngx-formly/core';

export function hiddenField(hide: boolean = true) {
  return <T extends Pick<FormlyFieldConfig, 'hide'>>(configuration: T): T => {
    return {
      ...configuration,
      hide
    };
  }
}