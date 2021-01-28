import { Component } from '@angular/core';
import { FormlyBuilder } from '@ngx-formly/builder';


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

  ngOnInit(): void {

    const builder = new FormlyBuilder<UserModel>();

    builder.field('firstName');

    builder.group('address').field('addressLine1');

    builder.group('address').withFields(group => [
      group.field('addressLine1')
    ])


  }
}
