import { FormlyFieldConfig } from '@ngx-formly/core';

export function fieldType(type: string) {
  return <T extends Pick<FormlyFieldConfig, 'type'>>(configuration: T): T => {
    return {
      ...configuration,
      type
    };
  }
}