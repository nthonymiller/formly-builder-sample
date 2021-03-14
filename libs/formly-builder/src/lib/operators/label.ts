import { FieldTemplateOptions, MonoTypeOperatorFunction } from '../types';

export function label<T extends FieldTemplateOptions>(value: string): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        label: value
      }
    };
  };
}