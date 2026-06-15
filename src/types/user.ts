export type AccountType = 'CPF' | 'CNPJ';

export type UserProfile = {
  uid: string;
  email: string;
  type: AccountType;
  accountType: AccountType;
  name?: string;
  companyName?: string;
  cpf?: string;
  cnpj?: string;
  phone?: string;
  bio?: string;
  avatar: string;
  isPremium: boolean;
  isVerifiedOrganizer: boolean;
  createdAt?: Date;
};