import { FieldTemplateOptions, MonoTypeOperatorFunction } from '../types';

export function required<T extends FieldTemplateOptions>(): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        required: true
      }
    };
  };
}