import { FieldTemplateOptions } from '../types';

export function max(value: number) {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        max: value
      }
    };
  }
}