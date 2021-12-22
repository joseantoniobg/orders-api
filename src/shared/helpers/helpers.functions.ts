import ezdate from '@nolock/ezdate';
import * as bcrypt from 'bcrypt';

export async function encrypt(password: string): Promise<string> {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function passwordMatch(
  hash: string,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function stringJson(data: any): string {
  return JSON.stringify(data, Object.getOwnPropertyNames(data));
}

export function objectJson(data: any): string {
  return JSON.parse(JSON.stringify(data, Object.getOwnPropertyNames(data)));
}

export const cleanObject = (obj: unknown) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  });
};

export function getDateFromStringISO(date: string): Date {
  if (!date || date == null) {
    return null;
  }
  const varDate = ezdate.getDate(date.substring(0, 10));
  return varDate;
}

export const formattedObject = (object: unknown): unknown => {
  return JSON.parse(stringJson(object));
};

export function getStringDateYYYYMMDD(date: Date): string {
  if (!date || date == null) {
    return null;
  }

  const varDate = ezdate.formatDate(date, ezdate.TypeDate.DB);
  return varDate;
}

export function getDateNow(): Date {
  return new Date(Date.now());
}

export function getInterfaceObject(object: any, reduced: any): any {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const reducer = require('lodash');
  return reducer.assign(reduced, reducer.pick(object, reducer.keys(reduced)));
}

export function getNumbersFromString(str: string): string {
  const res = str.replace(/\D/g, '');
  return res;
}

export function getFormattedObject(object: any, objectFormatter: any): any {
  const formattedObject = {} as typeof objectFormatter;

  Object.keys(object).forEach((key) => {
    if (Object.keys(objectFormatter).find((k) => k === key)) {
      if (object[key] !== null) {
        formattedObject[key] = object[key];
      }
    }
  });

  return formattedObject;
}

export function formatParametersString(object: unknown): string {
  let formattedString = '';

  Object.keys(object).forEach((key) => {
    if (object[key] !== null && object[key]) {
      if (formattedString === '') {
        formattedString = '?';
      } else {
        formattedString += '&';
      }

      formattedString += key + '=' + object[key];
    }
  });

  return formattedString;
}

export function isFormattedError(object: any): boolean {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const getter = require('lodash');
  const validator = getter.get(object, 'response.error.exception', 'Undefined');
  return validator != 'Undefined';
}

export const thowApiError = (error: Error, error2: Error) => {
  if (isFormattedError(error)) {
    throw error;
  }
  throw error2;
};

export const formatFieldString = (field: string): string => {
  return field.toUpperCase().trim();
};

export const formatEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const removeDashesFromUUID = (uuid: string): string => {
  const formattedUUID = uuid.split('-').join('');
  return formattedUUID;
};

export const formatUUID = (uuid: string): string => {
  const dataUUID = removeDashesFromUUID(uuid).toLowerCase();
  uuid =
    dataUUID.substring(0, 8) +
    '-' +
    dataUUID.substring(8, 12) +
    '-' +
    dataUUID.substring(12, 16) +
    '-' +
    dataUUID.substring(16, 20) +
    '-' +
    uuid.substring(20);
  return uuid;
};

export const formatDocumentFromNumberToString = (
  document: number,
  person_type: number,
): string => {
  const stringDocument = document.toString();
  if (person_type === 0) {
    return stringDocument.padStart(11 - stringDocument.length, '0');
  } else {
    return stringDocument.padStart(14 - stringDocument.length, '0');
  }
};
