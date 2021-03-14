import { FieldTemplateOptions } from '../types';

export function customProps<T extends {}>(value: T) {
  return <T extends FieldTemplateOptions>(configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        ...value
      }
    };
  }
}