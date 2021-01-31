import { FormlyFieldConfig } from '@ngx-formly/core';
import { TemplateBuilder } from './template-builder';

describe('TemplateBuilder', () => {

  it('should create template', () => {
    const templateLayout = new TemplateBuilder('<div>My Template</div>');

    expect(templateLayout).toBeDefined();
    expect(templateLayout.template).toEqual('<div>My Template</div>');
  })

  it('should build field with template', () => {
    const templateLayout = new TemplateBuilder('<div>My Template</div>');

    const config: FormlyFieldConfig = templateLayout.build();

    expect(config).toEqual({ type: 'formly-template', template: '<div>My Template</div>' });
  });

});