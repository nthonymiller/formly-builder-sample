# NgxFormlyBuilder

Motivation behind creating this is too make the defining of the forms type safe, and to allow users to easily provide customizations.


### An example model:

```typescript

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

```

## Create FormlyBuilder
Create a strongly type safe builder for the model

```typescript

const builder = new FormlyBuilder<UserModel>();

```

## Add a single field

A field is the basic building block of defining fields.

This will simply create a field with the specified key. The key entered will be verified as a key in the model.
```typescript

builder.field('firstName');

```

Define additional properties using withProps(...)

```typescript

builder.field('firstName').withProps(label('First name'), fieldType('input'));

```
withProps(...) takes an array of operators that are used to build up the formly field definitions.


## Add multiple fields

The ability to add multiple fields.

```typescript

builder.withFields(builder => [
  builder.field('firstName').withProps(label('First name'), fieldType('input')),
  builder.field('lastName').withProps(label('Last name'), fieldType('input'))
]);

```

## Add Complex Object

The ability to specify a nested object with fields.

```typescript

builder.group('address')
  .withFields(group => [
    group.field('addressLine1').withProps(label('Address Line 1'), fieldType('input')),
    group.field('city').withProps(label('City'), fieldType('input')),
    group.field('zip').withProps(label('Zip'), fieldType('input')),
  ]);

```

## Add Layout

The ability to group fields together for the purpose of defining a layout.

```typescript

builder.layout()
  .withProps(groupClassName('grid grid-cols-2 gap-x-6'))
  .withFields(group => [
    group.field('firstName').withProps(label('First name'), fieldType('input')),
    group.field('lastName').withProps(label('Last name'), fieldType('input'))
  ]);

```

## Add Custom Template

The ability to inject custom html template into the layout.

```typescript

builder.template('<div class="text-lg font-semibold my-3">Some heading</div>');


```



## Build the form

The output from the build method generates the `FormlyFieldConfig`

```typescript

const fields = builder.build();

```


## Operators

The operators provide this ability to FormlyFieldConfig during the form build process. Operators are composed together for the desired outcome

- label
- fieldType
- inputType
- min
- max
- minLength
- required
- defaultValue
- className
- groupClassName
- focusField
- hiddenField
- customProps
- expressionProps
- hideExpression
- fieldHooks ( onInitField, afterViewInitField, onDestroyField )
- validators

### Custom Operator chaining

Provide the ability to compose your own operators together to reduce bloat.

```typescript

export const emailField = () => pipe(
    fieldType('input'),
    inputType('email'),
    validators({ validation: ['email'] })
  );


builder.field('email').withProps(emailField())

```

Or pass in custom parameters to enforce setting of values:

```typescript

export const numberField = (decimalPlaces: number) => pipe(
    fieldType('number'),
    customProps({ decimalPlaces: decimalPlaces })
  );

```