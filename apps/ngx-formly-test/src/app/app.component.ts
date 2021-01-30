import { Component } from '@angular/core';
import { fieldType, FormlyBuilder, label } from '@ngx-formly/builder';
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

    builder.field('firstName').withProps(label('First name'), fieldType('input'));
    builder.field('lastName').withProps(label('Last name'), fieldType('input'));


    this.fields = builder.build();
  }
}
