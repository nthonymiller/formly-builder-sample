import { FieldTemplateOptions, MonoTypeOperatorFunction } from '../types';

export function readonlyField<T extends FieldTemplateOptions>(value: boolean = true): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        readonly: value
      }
    };
  };
}