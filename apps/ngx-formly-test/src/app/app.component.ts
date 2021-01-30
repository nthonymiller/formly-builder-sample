import { Component } from '@angular/core';
import { fieldType, FormlyBuilder, groupClassName, label } from '@ngx-formly/builder';
import { FormlyFieldConfig } from '@ngx-formly/core';


export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
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

    const builder = new FormlyBuilder<UserModel>();

    builder.layout()
      .withProps(groupClassName('grid grid-cols-2 gap-x-6'))
      .withFields(group => [
        group.field('firstName').withProps(label('First name'), fieldType('input')),
        group.field('lastName').withProps(label('Last name'), fieldType('input'))
      ]);

    builder.group('address')
      .withFields(group => [
        group.field('addressLine1').withProps(label('Address Line 1'), fieldType('input')),
        group.field('city').withProps(label('City'), fieldType('input')),
        group.field('zip').withProps(label('Zip'), fieldType('input')),
      ]);

    this.fields = builder.build();
  }
}
