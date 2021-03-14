import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'formly-simple-repeat-section',
  template: `
    <formly-field *ngFor="let field of field.fieldGroup" [field]="field"></formly-field>
  `,
})
export class SimpleRepeatTypeComponent extends FieldArrayType {

  constructor(builder?: FormlyFormBuilder) {
    super(builder);
  }

}