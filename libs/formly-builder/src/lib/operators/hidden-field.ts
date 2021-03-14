import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction } from '../types';

export function hiddenField<T extends Pick<FormlyFieldConfig, 'hide'>>(hide: boolean = true): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      hide
    };
  };
}