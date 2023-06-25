import { ICreateOffer } from './offer';

export enum PROVIDER {
  offer1 = 'offer1',
  offer2 = 'offer2',
}

export interface IProvider<T> {
  fetch(): Promise<T>;
  parse(payload: T): ICreateOffer[];
}
