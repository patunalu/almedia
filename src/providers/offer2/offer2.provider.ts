import { payload } from '../../data/offer2.payload';
import { IFactory } from '../../interfaces/factory';
import { ICreateOffer } from '../../interfaces/offer';
import { IOffer2Payload } from '../../interfaces/offer2';
import { IProvider } from '../../interfaces/providers';
import { Offer2Factory } from './offer2.factroy';

export class Offer2Provider implements IProvider<IOffer2Payload> {
  fetch(): Promise<IOffer2Payload> {
    // This function should actually call the API of the provider. Below is just for test
    return Promise.resolve(payload);
  }

  // This function can actually be chained with the fecth call above.
  // However I separated it incase there're other need for the original
  // payload from the provide e.g logging
  parse(payload: IOffer2Payload): ICreateOffer[] {
    const factory = new Offer2Factory();

    return factory.setResponse(payload).build();
  }
}
