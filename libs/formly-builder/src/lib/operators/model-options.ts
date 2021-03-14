import { PropType } from '@ngx-formly/builder';
import { FormlyFieldConfig } from '@ngx-formly/core';

export function modelOptions<U = PropType<FormlyFieldConfig, 'modelOptions'>>(modelOptions: U) {
  return <T extends Pick<FormlyFieldConfig, 'modelOptions'>>(configuration: T): T => {
    return {
      ...configuration,
      modelOptions
    };
  }
}