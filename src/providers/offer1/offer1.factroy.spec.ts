import { IOffer1Payload, IOffer1 } from 'src/interfaces/offer1';
import { payload } from '../../data/offer1.payload';
import { ICreateOffer } from '../../interfaces/offer';
import { PROVIDER } from '../../interfaces/providers';
import { Offer1Factory } from './offer1.factroy';

describe('Offer1Factory', () => {
  let factory: Offer1Factory;
  let testResponse: IOffer1Payload;

  beforeEach(async () => {
    factory = new Offer1Factory();
    testResponse = JSON.parse(JSON.stringify(payload));
  });

  it('should be build offers', () => {
    const offers = factory.setResponse(testResponse).build();
    const expected: ICreateOffer[] = [
      {
        externalOfferId: '19524555',
        name: 'MyGym - iOS',
        description: 'Play and reach level 23 within 14 days.',
        requirements: 'Play and reach level 23 within 14 days.',
        offerUrlTemplate: 'https://some.url',
        thumbnail: 'https://some.url',
        isAndroid: 0,
        isDesktop: 0,
        isIos: 1,
        providerName: PROVIDER.offer1,
      },
    ];

    expect(offers).toBeInstanceOf(Array);
    expect(offers.length).toBe(1);
    expect(offers).toEqual(expected);
  });

  it('should skip bad offers', () => {
    testResponse.response.offers.push(
      {
        // Incomplete  object
        offer_id: '123456',
        offer_name: '',
        offer_desc: 'Some thihg',
      } as IOffer1,
      {
        // Valid object with empty string
        offer_id: '',
        offer_desc: '',
        offer_name: '',
        offer_url: '',
        call_to_action: '',
        amount: 0,
        disclaimer: '',
        offer_url_easy: '',
        package_id: '',
        image_url: '',
        image_url_220x124: '',
        payout: null,
        payout_type: '',
        category: null,
        countries: [],
        preview_url: '',
        last_modified: null,
        platform: 'desktop',
        device: '',
        verticals: null,
      },
    );
    const offers = factory.setResponse(testResponse).build();
    const expected: ICreateOffer[] = [
      {
        externalOfferId: '19524555',
        name: 'MyGym - iOS',
        description: 'Play and reach level 23 within 14 days.',
        requirements: 'Play and reach level 23 within 14 days.',
        offerUrlTemplate: 'https://some.url',
        thumbnail: 'https://some.url',
        isAndroid: 0,
        isDesktop: 0,
        isIos: 1,
        providerName: PROVIDER.offer1,
      },
    ];

    expect(offers).toBeInstanceOf(Array);
    expect(offers.length).toBe(1);
    expect(offers).toEqual(expected);
  });

  it('should be build multiple offers', () => {
    const offer = { ...testResponse.response.offers[0] }; // Create a new offer based on the orignal to test uniqueness and order
    offer.offer_id = 'test';
    offer.offer_name = 'Test offer';
    testResponse.response.offers.push(offer);
    const offers = factory.setResponse(testResponse).build();
    const expected: ICreateOffer[] = [
      {
        externalOfferId: '19524555',
        name: 'MyGym - iOS',
        description: 'Play and reach level 23 within 14 days.',
        requirements: 'Play and reach level 23 within 14 days.',
        offerUrlTemplate: 'https://some.url',
        thumbnail: 'https://some.url',
        isAndroid: 0,
        isDesktop: 0,
        isIos: 1,
        providerName: PROVIDER.offer1,
      },
      {
        externalOfferId: 'test',
        name: 'Test offer',
        description: 'Play and reach level 23 within 14 days.',
        requirements: 'Play and reach level 23 within 14 days.',
        offerUrlTemplate: 'https://some.url',
        thumbnail: 'https://some.url',
        isAndroid: 0,
        isDesktop: 0,
        isIos: 1,
        providerName: PROVIDER.offer1,
      },
    ];

    expect(offers).toBeInstanceOf(Array);
    expect(offers.length).toBe(2);
    expect(offers).toEqual(expected);
  });
});
