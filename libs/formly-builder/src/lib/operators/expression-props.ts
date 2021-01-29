import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

export function expressionProps(value: {
    [property: string]: string | ((model: any, formState: any, field?: FormlyFieldConfig) => any) | Observable<any>;
  }) {
  return (configuration: FormlyFieldConfig): FormlyFieldConfig => {
    return {
      ...configuration,
      expressionProperties: {
        ...(configuration.expressionProperties ?? {}),
        ...value
      }
    };
  }
}