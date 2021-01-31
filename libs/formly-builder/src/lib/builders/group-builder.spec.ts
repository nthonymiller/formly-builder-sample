import { FormlyFieldConfig } from '@ngx-formly/core';
import { groupClassName } from '../operators';
import { GroupBuilder, LayoutBuilder } from './group-builder';

describe('GroupBuilder', () => {

  it('should create group', () => {
    const groupBuilder = new GroupBuilder('name');

    expect(groupBuilder).toBeDefined();
    expect(groupBuilder.key).toEqual('name');
  });

  it('should create group with name', () => {
    const groupBuilder = new GroupBuilder('name');

    const config: FormlyFieldConfig = groupBuilder.build();

    expect(config).toEqual({ key: 'name', fieldGroup: [] });
  });

  it('should build group with props', () => {
    const groupBuilder = new GroupBuilder('name')
      .withProps(
        groupClassName('flex')
      );

    const config: FormlyFieldConfig = groupBuilder.build();

    expect(config).toEqual({ key: 'name', fieldGroup: [], fieldGroupClassName: 'flex' });
  });

});

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