import { registerDecorator, ValidationOptions } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';
import { getNumbersFromString } from '../helpers/helpers.functions';
import { languages, lang } from '../languages/content.lang';

export function IsCpf() {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsCpf',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: { message: languages[lang].InvalidCPF },
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
