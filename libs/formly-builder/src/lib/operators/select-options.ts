import { FieldTemplateOptions, MonoTypeOperatorFunction, PropType } from '../types';

export function selectOptions<T extends FieldTemplateOptions, U = PropType<T, 'templateOptions'>>(value: U): MonoTypeOperatorFunction<T> {
  return (configuration: T): T => {
    return {
      ...configuration,
      templateOptions: {
        ...(configuration.templateOptions ?? {}),
        options: value
      }
    };
  };
}