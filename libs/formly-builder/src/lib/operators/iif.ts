import { FormlyFieldConfig } from '@ngx-formly/core'
import { pipeFromArray } from '../builder/build-utils';
import { MonoTypeOperatorFunction } from '../types';

export function iif(value: boolean, ...operations: MonoTypeOperatorFunction<any>[]) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    if (value) {
      return pipeFromArray(operations)(configuration);
    }
    return configuration;
  }
}