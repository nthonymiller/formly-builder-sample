import { FormlyFieldConfig } from '@ngx-formly/core';

export function groupClassName(className: string) {
  return <T extends Pick<FormlyFieldConfig, 'fieldGroupClassName'>>(configuration: T): T => {
    return {
      ...configuration,
      fieldGroupClassName: className,
    };
  }
}