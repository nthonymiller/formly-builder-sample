import { FormlyFieldConfig } from '@ngx-formly/core';
import { MonoTypeOperatorFunction, PropType } from '../types';

type hookType =  PropType<FormlyFieldConfig, 'hooks'>;

export function fieldHooks<T extends Pick<FormlyFieldConfig, 'hooks'>, U = hookType>(value: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      hooks: {
        ...(configuration.hooks ?? {}),
        ...value
      }
    };
  };
}

export const onInitField = <U = hookType>(formlyHookFn: U) => fieldHooks({ onInit: formlyHookFn });
export const afterViewInitField = <U = hookType>(formlyHookFn: U) => fieldHooks({ afterViewInit: formlyHookFn });
export const onDestroyField = <U = hookType>(formlyHookFn: U) => fieldHooks({ onDestroy: formlyHookFn });
