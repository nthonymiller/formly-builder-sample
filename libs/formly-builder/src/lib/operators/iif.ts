import { pipeFromArray } from '../pipe';
import { MonoTypeOperatorFunction } from '../types';

export function iif(value: boolean, ...operations: MonoTypeOperatorFunction<any>[]) {
  return <T>(configuration: T): T => {
    if (value) {
      return pipeFromArray(operations)(configuration);
    }
    return configuration;
  }
}