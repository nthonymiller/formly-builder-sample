import { FormlyFieldConfig } from '@ngx-formly/core';

export function className(className: string) {
  return <T extends Pick<FormlyFieldConfig, 'className'>>(configuration: T): T => {
    return {
      ...configuration,
      className: `${configuration.className ?? ''} ${className ?? ''}`
    };
  }
}