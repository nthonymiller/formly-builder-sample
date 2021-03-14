import { FormlyFieldConfig } from '@ngx-formly/core';

export function defaultValue<TValue>(value: TValue) {
  return <T extends Pick<FormlyFieldConfig, 'defaultValue'>>(configuration: T): T => {
    return {
      ...configuration,
      defaultValue: value
    };
  }
}