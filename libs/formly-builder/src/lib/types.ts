export interface UnaryFunction<T, R> { (source: T): R; }

export interface OperatorFunction<T, R> extends UnaryFunction<T, R> {}

export interface MonoTypeOperatorFunction<T> extends UnaryFunction<T, T> {}

export type Obj = { [key: string]: any };

export function identity<T>(x: T): T {
  return x;
}
