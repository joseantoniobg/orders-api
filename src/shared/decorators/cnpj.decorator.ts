import { registerDecorator, ValidationOptions } from 'class-validator';
import { cnpj } from 'cpf-cnpj-validator';
import { getNumbersFromString } from '../helpers/helpers.functions';

export function IsCnpj() {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsCnpj',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: { message: 'Invalid CNPJ Number' },
      validator: {
        validate(value: string) {
          if (value) {
            value = getNumbersFromString(value);
          }

          if (value.length < 14) {
            value = value.padStart(11, '0');
          }

          if (cnpj.isValid(value)) {
            return true;
          }

          return false;
        },
      },
    });
  };
}
