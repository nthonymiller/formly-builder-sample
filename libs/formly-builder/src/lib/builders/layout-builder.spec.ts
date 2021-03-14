import { FormlyFieldConfig } from '@ngx-formly/core';
import { groupClassName } from '../operators';
import { LayoutBuilder } from './group-builder';

describe('LayoutBuilder', () => {

  it('should create layout', () => {
    const layoutBuilder = new LayoutBuilder();

    expect(layoutBuilder).toBeDefined();
  })

  it('should build layout with props', () => {
    const layoutBuilder = new LayoutBuilder();
    layoutBuilder.withProps(groupClassName('flex'));

    const config: FormlyFieldConfig = layoutBuilder.build();

    expect(config).toEqual({ fieldGroup: [], fieldGroupClassName: 'flex' });
  })

})