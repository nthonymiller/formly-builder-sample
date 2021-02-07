import { FormlyFieldConfig } from '@ngx-formly/core';
import { className, customProps, fieldType, groupClassName, inputType, label, required } from '../operators';
import { ArrayBuilder } from './group-builder';

interface InvestmentModel {
  investmentName: string;
  investmentDate?: Date;
  stockIdentifier?: string;
}

describe('ArrayBuilder', () => {

  it('should create array builder', () => {
    const arrayBuilder = new ArrayBuilder('name');

    expect(arrayBuilder).toBeDefined();
    expect(arrayBuilder.key).toEqual('name');
  });

  it('should build array with name', () => {
    const arrayBuilder = new ArrayBuilder('name');

    const config: FormlyFieldConfig = arrayBuilder.build();

    expect(config).toEqual({ key: 'name', fieldArray: {} });
  });

  it('should build array with props', () => {
    const groupBuilder = new ArrayBuilder('name')
      .withProps(
        groupClassName('flex'),
        fieldType('repeat')
      );

    const config: FormlyFieldConfig = groupBuilder.build();

    expect(config).toEqual({ key: 'name', type: 'repeat', fieldArray: {}, fieldGroupClassName: 'flex' });
  });

  it('should build array with single field', () => {
    const arrayBuilder = new ArrayBuilder<InvestmentModel>('investments')
      .withProps(
        groupClassName('flex'),
        fieldType('repeat')
      );
    arrayBuilder.field('investmentName').withProps(fieldType('input'), label('Name of investment'), required());

    const config: FormlyFieldConfig = arrayBuilder.build();

    expect(config).toEqual({
      key: 'investments',
      type: 'repeat',
      fieldGroupClassName: 'flex',
      fieldArray: {
        key: 'investmentName',
        type: 'input',
        templateOptions: {
          label: 'Name of investment',
          required: true
        }
      }
    });
  });

  it('should build array with group', () => {
    const arrayBuilder = new ArrayBuilder<InvestmentModel>('investments')
      .withProps(
        groupClassName('flex'),
        fieldType('repeat'),
        customProps({ addText: 'Add another investment' })
      );
    arrayBuilder.group().withFields(group => [
      group.field('investmentName').withProps(fieldType('input'), label('Name of investment:'), required(), className('col-sm-4')),
      group.field('investmentDate').withProps(fieldType('input'), label('Date of investment:'), inputType('date'), className('col-sm-4')),
      group.field('stockIdentifier').withProps(fieldType('input'), label('Stock identifier:'), className('col-sm-4'))
    ]);

    const config: FormlyFieldConfig = arrayBuilder.build();

    expect(config).toEqual({
      key: 'investments',
      type: 'repeat',
      fieldGroupClassName: 'flex',
      templateOptions: {
        addText: 'Add another investment',
      },
      fieldArray: {
        fieldGroup: [
          {
            className: 'col-sm-4',
            type: 'input',
            key: 'investmentName',
            templateOptions: {
              label: 'Name of investment:',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'investmentDate',
            className: 'col-sm-4',
            templateOptions: {
              type: 'date',
              label: 'Date of investment:',
            },
          },
          {
            type: 'input',
            key: 'stockIdentifier',
            className: 'col-sm-4',
            templateOptions: {
              label: 'Stock identifier:',
            },
          },
        ],
      }
    });
  });

});

