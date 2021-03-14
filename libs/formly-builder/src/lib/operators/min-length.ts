import { FieldTemplateOptions, MonoTypeOperatorFunction } from '../types';

export function minLength<T extends FieldTemplateOptions>(value: number): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        minLength: value
      }
    };
  };
}