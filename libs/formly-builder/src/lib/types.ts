import { FormlyFieldConfig } from '@ngx-formly/core';

export interface UnaryFunction<T, R> { (source: T): R; }

export interface OperatorFunction<T, R> extends UnaryFunction<T, R> {}

export interface MonoTypeOperatorFunction<T> extends UnaryFunction<T, T> {}

export type Obj = { [key: string]: any };

export function identity<T>(x: T): T {
  return x;
}

export type ArrayProperties<T> = Pick<T,
  { [K in keyof T]: T[K] extends Array<any> ? K : never }[keyof T]>;

export type ArrayPropertyType<T> = T extends Array<infer U> ? U : never;

type Unboxed<T> =
    T extends (infer U)[]
        ? U
        : T;

export interface TypeMap { // for mapping from strings to types
  string: string;
  number: number;
  boolean: boolean;
}

export type PrimitiveOrObject = // 'string' | 'number' | 'boolean' | constructor
  | Obj
  | keyof TypeMap;

export type GuardedType<T extends PrimitiveOrObject> = T extends Obj ? T : T extends keyof TypeMap ? TypeMap[T] : never;

export type ObjectType<T> = T extends Obj ? T : never;

export type PrimitiveType<T> = T extends Obj ? never : T ;

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export type FormlyGroupProps = Pick<FormlyFieldConfig, 'id' | 'fieldGroupClassName' | 'fieldGroup' | 'modelOptions' | 'hideExpression'>;
export type FormlyArrayProps = Pick<FormlyFieldConfig, 'id' | 'type' | 'fieldArray' | 'modelOptions' | 'templateOptions'>;
export type FormlyTemplateProps = Pick<FormlyFieldConfig, 'id' | 'template'>;
export type FormlyLayoutProps = Pick<FormlyFieldConfig, 'fieldGroupClassName' | 'hideExpression'>;
export type FormlyFieldProps = Omit<FormlyFieldConfig, 'fieldGroupClassName' | 'fieldGroup' | 'fieldArray' | 'template'>;
export type FieldTemplateOptions = Pick<FormlyFieldConfig, 'templateOptions'>;