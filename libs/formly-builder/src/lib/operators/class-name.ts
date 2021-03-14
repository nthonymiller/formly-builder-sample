import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction } from '../types';

export function className<T extends Pick<FormlyFieldConfig, 'className'>>(className: string): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      className: `${configuration.className ?? ''} ${className ?? ''}`
    };
  }
}