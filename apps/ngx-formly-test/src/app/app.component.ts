import { Component } from '@angular/core';
import { fieldType, FormlyBuilder, groupClassName, label } from '@ngx-formly/builder';
import { FormlyFieldConfig } from '@ngx-formly/core';


export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  postalAddress: Address;
  homeAddress: Address;
}

export interface Address {
  addressLine1: string;
  city: string;
  zip: string;
}

@Component({
  selector: 'ngx-formly-builder-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-formly-test';

  fields: FormlyFieldConfig[];
  model = {};

  ngOnInit(): void {

    const templateBody = (title: string) => `<div class="text-lg font-semibold my-3">${title}</div>`;

    const emptyTypeBuilder = new FormlyBuilder();
    emptyTypeBuilder.field('John');

    const addressBuilder = new FormlyBuilder<Address>();
    addressBuilder.withFields(group => [
      group.field('addressLine1').withProps(label('Address Line 1'), fieldType('input')),
      group.field('city').withProps(label('City'), fieldType('input')),
      group.field('zip').withProps(label('Zip'), fieldType('input')),
    ]);

    const builder = new FormlyBuilder<UserModel>();

    builder.template(templateBody('Customer Details'))
    builder.layout()
      .withProps(groupClassName('grid grid-cols-2 gap-x-6'))
      .withFields(group => [
        group.field('firstName').withProps(label('First name'), fieldType('input')),
        group.field('lastName').withProps(label('Last name'), fieldType('input'))
      ]);

    // Can add another builder for reuse
    builder.template(templateBody('Home Address'));
    builder.group('homeAddress').add(addressBuilder);

    // Or specify the fields this way
    builder.template(templateBody('Postal Address'));
    builder.group('postalAddress')
      .withFields(group => [
        group.field('addressLine1').withProps(label('Address Line 1'), fieldType('input')),
        group.field('city').withProps(label('City'), fieldType('input')),
        group.field('zip').withProps(label('Zip'), fieldType('input')),
      ]);

    this.fields = builder.build();
  }
}
