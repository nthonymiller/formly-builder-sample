import { FormlyFieldConfig } from '@ngx-formly/core';

export function className(className: string) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      className
    };
  }
}