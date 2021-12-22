import { registerDecorator, ValidationOptions } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';
import { getNumbersFromString } from '../helpers/helpers.functions';

export function IsCpf() {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsCpf',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: { message: 'Invalid CPF Number' },
      validator: {
        validate(value: string) {
          if (value) {
            value = getNumbersFromString(value);
          }

          if (value.length < 11) {
            value = value.padStart(11, '0');
          }

          if (cpf.isValid(value)) {
            return true;
          }

          return false;
        },
      },
    });
  };
}
