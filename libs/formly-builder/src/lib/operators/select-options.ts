import { Observable } from 'rxjs';
import { FieldTemplateOptions } from '../types';

export function selectOptions(value: any[] | Observable<any[]>) {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        options: value
      }
    };
  }
}