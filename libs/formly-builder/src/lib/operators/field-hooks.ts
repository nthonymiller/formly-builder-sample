import { FormlyFieldConfig } from '@ngx-formly/core';
import { PropType } from '../types';

type hookType =  PropType<FormlyFieldConfig, 'hooks'>;

export function fieldHooks<U = hookType>(value: U) {
  return <T extends Pick<FormlyFieldConfig, 'hooks'>>(configuration: T): T => {
    return {
      ...configuration,
      hooks: {
        ...(configuration.hooks ?? {}),
        ...value
      }
    };
  }
}

export const onInitField = <U = hookType>(formlyHookFn: U) => fieldHooks({ onInit: formlyHookFn });
export const afterViewInitField = <U = hookType>(formlyHookFn: U) => fieldHooks({ afterViewInit: formlyHookFn });
export const onDestroyField = <U = hookType>(formlyHookFn: U) => fieldHooks({ onDestroy: formlyHookFn });
