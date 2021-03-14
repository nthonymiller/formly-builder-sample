import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction } from '../types';

export function fieldType<T extends Pick<FormlyFieldConfig, 'type'>>(type: string): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      type
    };
  };
}