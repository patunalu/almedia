import { ICreateOffer } from './offer';

export interface IFactory<T> {
  setResponse(response: T): IFactory<T>;
  build(): ICreateOffer[];
}
