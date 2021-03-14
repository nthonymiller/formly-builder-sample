import { FormlyFieldConfig } from '@ngx-formly/core';
import { PropType } from '../types';

export function hideExpression<U = PropType<FormlyFieldConfig, 'hideExpression'>>(value: U) {
  return <T extends Pick<FormlyFieldConfig, 'hideExpression'>>(configuration: T): T => {
    return {
      ...configuration,
      hideExpression: value
    };
  }
}