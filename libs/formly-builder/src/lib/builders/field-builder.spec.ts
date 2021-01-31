import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldBuilder } from './field-builder';
import { label } from '../operators'

describe('FieldBuilder', () => {

  it('should create field', () => {
    const fieldBuilder = new FieldBuilder('name');

    expect(fieldBuilder).toBeDefined();
    expect(fieldBuilder.key).toEqual('name');
  });

  it('should build field with name', () => {
    const fieldBuilder = new FieldBuilder('name');

    const config: FormlyFieldConfig = fieldBuilder.build();

    expect(config).toEqual({ key: 'name' });
  });

  it('should build field with props', () => {
    const fieldBuilder = new FieldBuilder('name')
      .withProps(
        label('Name of Label')
      );

    const config: FormlyFieldConfig = fieldBuilder.build();

    expect(config).toEqual({ key: 'name', templateOptions: { label: 'Name of Label' } });
  });

});