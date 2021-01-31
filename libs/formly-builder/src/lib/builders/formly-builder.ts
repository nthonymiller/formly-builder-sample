import { FormlyFieldConfig } from '@ngx-formly/core';
import { Obj } from '../types';
import { Builder } from './builder';
import { GroupBuilderBase } from './group-builder';

/** FormlyBuilder is the root builder for the Model */
export class FormlyBuilder<T extends Obj = any> extends GroupBuilderBase<T> implements Builder<FormlyFieldConfig[]> {

  public build(): FormlyFieldConfig[] {
    return this.buildGroup();
  }

}
