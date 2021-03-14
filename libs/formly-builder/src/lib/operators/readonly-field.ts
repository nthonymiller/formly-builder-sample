import { FieldTemplateOptions } from '../types';

export function readonlyField(value: boolean = true) {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        readonly: value
      }
    };
  }
}