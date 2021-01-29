import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyHookFn, FormlyLifeCycleOptions } from '@ngx-formly/core/lib/components/formly.field.config';

export function fieldHooks(value: FormlyLifeCycleOptions<FormlyHookFn>) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      hooks: {
        ...(configuration.hooks ?? {}),
        ...value
      }
    };
  }
}

export const onInitField = (formlyHookFn: FormlyHookFn) => fieldHooks({ onInit: formlyHookFn });
export const afterViewInitField = (formlyHookFn: FormlyHookFn) => fieldHooks({ afterViewInit: formlyHookFn });
export const onDestroyField = (formlyHookFn: FormlyHookFn) => fieldHooks({ onDestroy: formlyHookFn });
