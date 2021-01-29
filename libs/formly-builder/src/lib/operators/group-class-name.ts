import { FormlyFieldConfig } from '@ngx-formly/core';

export function groupClassName(className: string) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      fieldGroupClassName: className
    };
  }
}