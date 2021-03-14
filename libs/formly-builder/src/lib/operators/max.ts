import { FieldTemplateOptions, MonoTypeOperatorFunction } from '../types';

export function max<T extends FieldTemplateOptions>(value: number): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        max: value
      }
    };
  };
}