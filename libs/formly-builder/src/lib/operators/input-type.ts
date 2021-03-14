import { FieldTemplateOptions } from '../types';

export function inputType(value: string) {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        type: value
      }
    };
  }
}