import { FieldTemplateOptions } from '../types';

export function min(value: number) {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        min: value
      }
    };
  }
}