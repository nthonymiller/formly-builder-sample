import { identity, MonoTypeOperatorFunction } from './types';

/** @internal */
export function pipeFromArray<T>(fns: Array<MonoTypeOperatorFunction<T>>): MonoTypeOperatorFunction<T> {
  if (fns.length === 0) {
    return identity as MonoTypeOperatorFunction<T>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): T {
    return fns.reduce((prev: any, fn: MonoTypeOperatorFunction<T>) => fn(prev), input as any);
  };
}


export function pipe<T>(...fns: Array<MonoTypeOperatorFunction<T>>): MonoTypeOperatorFunction<T> {
  return pipeFromArray(fns);
}