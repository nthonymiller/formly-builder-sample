import { FormlyFieldConfig } from '@ngx-formly/core';
import { Obj } from '../types';
import { Builder } from './builder';
import { GroupBuildBase } from './group-builder';

export class FormlyBuilder<T extends Obj = any> extends GroupBuildBase<T> implements Builder<FormlyFieldConfig[]> {

  public build(): FormlyFieldConfig[] {
    return this.buildGroup(this, this._builders);
  }

}
