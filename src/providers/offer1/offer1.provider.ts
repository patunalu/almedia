import { payload } from '../../data/offer1.payload';
import { ICreateOffer } from '../../interfaces/offer';
import { IOffer1Payload } from '../../interfaces/offer1';
import { IProvider } from '../../interfaces/providers';
import { Offer1Factory } from './offer1.factroy';

export class Offer1Provider implements IProvider<IOffer1Payload> {
  fetch(): Promise<IOffer1Payload> {
    // This function should actually call the API of the provider. Below is just for test
    return Promise.resolve(payload);
  }

  // This function can actually be chained with the fecth call above.
  // However I separated it incase there're other need for the original
  // payload from the provide e.g logging
  parse(payload: IOffer1Payload): ICreateOffer[] {
    const factory = new Offer1Factory();
    return factory.setResponse(payload).build();
  }
}
