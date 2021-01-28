import { FormlyFieldConfig } from '@ngx-formly/core';

export type Obj = { [key: string]: any };

export interface Builder {
  build(): any;
}

export class FieldBuilder<T> implements Builder {

  constructor(public key: T) { }

  build(): FormlyFieldConfig {
    return { key: this.key as unknown as string };
  }
}

export class GroupBuilder<T extends Obj = any> implements Builder {

  private _builders = [];

  constructor(key?: string | number | any) { }

  field<K extends keyof T>(key: K): any {
    return this.addBuilder(new FieldBuilder(key));
  }

  withFields<R extends Builder, K = this>(project: (value: K) => R[]): GroupBuilder {
    this.addBuilder(project);
    return this;
  }

  group<K extends keyof T>(key: K): GroupBuilder<T[K]> {
    return this.addBuilder(new GroupBuilder<T[K]>(key));
  }

  build(): FormlyFieldConfig[] {
    return [];
  }

  protected addBuilder<U>(value: U): U {
    this._builders.push(value);
    return value;
  }

}


export class FormlyBuilder<T extends Obj = any> extends GroupBuilder<T> implements Builder {

  constructor() {
    super()
  }

}