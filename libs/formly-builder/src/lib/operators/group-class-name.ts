import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction } from '../types';

export function groupClassName<T extends Pick<FormlyFieldConfig, 'fieldGroupClassName'>>(className: string): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      fieldGroupClassName: className,
    };
  };
}