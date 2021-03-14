import { FieldTemplateOptions } from '../types';

export function label(value: string) {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        label: value
      }
    };
  }
}