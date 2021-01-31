import { FormlyFieldConfig } from '@ngx-formly/core';
import { Builder } from './builder';

/** TemplateBuilder allows html display element to be added to the node tree. */
export class TemplateBuilder implements Builder<FormlyFieldConfig>{

  constructor(public readonly template: string) { }

  build(): FormlyFieldConfig {
    return {
      type: 'formly-template',
      template: this.template
    };
  }

}