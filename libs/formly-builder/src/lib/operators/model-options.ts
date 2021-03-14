import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction, PropType } from '../types';

export function modelOptions<T extends Pick<FormlyFieldConfig, 'modelOptions'>, U = PropType<FormlyFieldConfig, 'modelOptions'>>(modelOptions: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      modelOptions
    };
  };
}