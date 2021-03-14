import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction } from '../types';

export function focusField<T extends Pick<FormlyFieldConfig, 'focus'>>(focus: boolean = true): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      focus
    };
  };
}