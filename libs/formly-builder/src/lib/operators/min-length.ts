import { FieldTemplateOptions } from '../types';

export function minLength(value: number) {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        minLength: value
      }
    };
  }
}