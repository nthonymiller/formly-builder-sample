import { Component } from '@angular/core';
import { fieldType, FormlyBuilder, groupClassName, inputType, label, onInitField } from '@ngx-formly/builder';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { debounceTime, filter, startWith, tap } from 'rxjs/operators';

export interface Phone {
  phoneNo: string;
}

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  postalAddress: Address;
  homeAddress: Address;
  phones: Array<Phone>;
  tags: Array<string>;
  tagCount: number;
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
  model: Partial<UserModel> = {
    tagCount: 3,
    tags: []
  };

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

    builder.field('tagCount').withProps(
      label('Tag count'),
      fieldType('input'),
      inputType('number'),
      onInitField(field => {
        return field.formControl.valueChanges
          .pipe(
            startWith(field.formControl.value),
            filter(v => v > 0),
            debounceTime(100), // need to delay here due to on change detection error
            tap((value: number) => {
              this.model = {
                ...this.model,
                tags: (this.model.tags ?? []),
                tagCount: value,
              };
              this.model.tags.length = value;
            }),
        );
      })
    );
    builder.array('tags')
      .withProps(fieldType('simple-repeat'))
        .field('tag')
        .withProps(label('Tag'), fieldType('input'));

    //builder.array('phones').group().withFields(group => [group.field('phoneNo').withProps(label('Phone no'), fieldType('input'))])

    this.fields = builder.build();
  }
}
