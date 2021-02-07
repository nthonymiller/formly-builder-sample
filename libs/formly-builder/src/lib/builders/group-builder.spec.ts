import { FormlyFieldConfig } from '@ngx-formly/core';
import { groupClassName } from '../operators';
import { GroupBuilder } from './group-builder';

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

