import { FormlyFieldConfig } from '@ngx-formly/core';
import { PropType } from '../types';

export function expressionProps<U = PropType<FormlyFieldConfig, 'expressionProperties'>>(value: U) {
  return <T extends Pick<FormlyFieldConfig, 'expressionProperties'>>(configuration: T): T => {
    return {
      ...configuration,
      expressionProperties: {
        ...(configuration.expressionProperties ?? {}),
        ...value
      }
    };
  }
}