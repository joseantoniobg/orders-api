class Language {
  InvalidCredentials: string;
  SameEmail: string;
  SameUser: string;
  InvalidCNPJ: string;
  InvalidCPF: string;
  SameCNPJ: string;
  UserNotFound: string;
}

class Languages {
  'pt-Br': Language;
  'en-Us': Language;
}

export const lang = 'pt-Br';

export const languages: Languages = {
  'pt-Br': {
    InvalidCredentials: 'Senha ou Usuário incorretos',
    SameEmail: 'Esse e-mail já está cadastrado conosco',
    SameUser: 'Esse usuário já está cadastrado conosco',
    InvalidCNPJ: 'CNPJ inválido',
    InvalidCPF: 'CPF inválido',
    SameCNPJ: 'CNPJ já cadastrado',
    UserNotFound: 'Usuário não localizado',
  },
  'en-Us': {
    InvalidCredentials: 'Invalid Credentials',
    SameEmail: 'An user with the same e-mail already exists',
    SameUser: 'An user with the same username already exists',
    InvalidCNPJ: 'Invalid CNPJ Number',
    InvalidCPF: 'Invalid CPF Number',
    SameCNPJ: 'CNPJ already exists',
    UserNotFound: 'User not found',
  },
};
