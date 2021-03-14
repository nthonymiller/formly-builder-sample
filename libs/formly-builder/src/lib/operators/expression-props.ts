import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction, PropType } from '../types';

export function expressionProps<T extends Pick<FormlyFieldConfig, 'expressionProperties'>, U = PropType<FormlyFieldConfig, 'expressionProperties'>>(value: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      expressionProperties: {
        ...(configuration.expressionProperties ?? {}),
        ...value
      }
    };
  };
}