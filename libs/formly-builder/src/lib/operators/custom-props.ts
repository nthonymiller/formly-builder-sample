import { FieldTemplateOptions, MonoTypeOperatorFunction } from '../types';

export function customProps<T extends FieldTemplateOptions, U extends {}>(value: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        ...value
      }
    };
  }
}