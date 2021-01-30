import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldBuilder, FormlyBuilder, GroupBuilder } from './formly-builder';
import { groupClassName, label } from './operators';

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  address?: Address;
}

export interface Address {
  addressLine1: string;
  city: string;
  zip: string;
}


describe('Builders', () => {

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

  describe('GroupBuilder', () => {

    it('should create group', () => {
      const groupBuilder = new GroupBuilder('name');

      expect(groupBuilder).toBeDefined();
    });

    it('should create group with name', () => {
      const groupBuilder = new GroupBuilder('name');

      const config = groupBuilder.build();

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


  describe('FormlyBuilder', () => {

    let formlyBuilder: FormlyBuilder<UserModel>;

    beforeEach(() => {
      formlyBuilder = new FormlyBuilder<UserModel>();
    });

    it('should create form builder', () => {
      expect(formlyBuilder).toBeDefined();
    });

    it('should build user form using field', () => {
      formlyBuilder.field('firstName');
      formlyBuilder.field('lastName');
      formlyBuilder.field('email');

      const config = formlyBuilder.build();

      expect(config).toEqual([
        { key: 'firstName'},
        { key: 'lastName'},
        { key: 'email' }
      ]);
    });

    it('should build user form using withFields', () => {
      formlyBuilder.withFields(group => [
        group.field('firstName'),
        group.field('lastName'),
        group.field('email')
      ]);

      const config = formlyBuilder.build();

      expect(config).toEqual([
        { key: 'firstName'},
        { key: 'lastName'},
        { key: 'email' }
      ]);
    });

    it('should build user form using with address fields', () => {
      formlyBuilder.withFields(group => [
        group.field('firstName'),
        group.field('lastName'),
        group.field('email'),
      ]);

      formlyBuilder.group('address').withFields(group => [
        group.field('addressLine1'),
        group.field('city'),
        group.field('zip')
      ])

      const config = formlyBuilder.build();

      expect(config).toEqual([
        { key: 'firstName'},
        { key: 'lastName'},
        { key: 'email' },
        { key: 'address', fieldGroup: [{ key: 'addressLine1'}, { key: 'city'}, { key: 'zip'} ]}
      ]);
    });

    it('should build user form using with address fields using chaining', () => {
      formlyBuilder.withFields(group => [
        group.field('firstName'),
        group.field('lastName'),
        group.field('email'),
        group.group('address').withFields(ga => [
          ga.field('addressLine1'),
          ga.field('city'),
          ga.field('zip')
        ])
      ]);

      const config = formlyBuilder.build();

      expect(config).toEqual([
        { key: 'firstName'},
        { key: 'lastName'},
        { key: 'email' },
        { key: 'address', fieldGroup: [{ key: 'addressLine1'}, { key: 'city'}, { key: 'zip'} ]}
      ]);
    });

  });
});