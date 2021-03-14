import { FieldTemplateOptions } from '../types';

export function required() {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        required: true
      }
    };
  }
}