import { FieldTemplateOptions, MonoTypeOperatorFunction } from '../types';

export function inputType<T extends FieldTemplateOptions>(value: string): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        type: value
      }
    };
  };
}