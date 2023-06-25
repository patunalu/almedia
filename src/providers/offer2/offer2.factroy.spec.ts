import { IOffer2Payload, IOffer2 } from '../../interfaces/offer2';
import { payload } from '../../data/offer2.payload';
import { ICreateOffer } from '../../interfaces/offer';
import { PROVIDER } from '../../interfaces/providers';
import { Offer2Factory } from './offer2.factroy';

describe('Offer2Factory', () => {
  let factory: Offer2Factory;
  let testResponse: IOffer2Payload;

  beforeEach(async () => {
    factory = new Offer2Factory();
    testResponse = JSON.parse(JSON.stringify(payload));
  });

  it('should be build offers', () => {
    const offers = factory.setResponse(testResponse).build();
    const expected: ICreateOffer[] = [
      {
        externalOfferId: '15828',
        name: 'Sofi',
        description:
          'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
        requirements:
          'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
        offerUrlTemplate: 'https://some.url',
        thumbnail: 'https://some.url',
        isAndroid: 0,
        isDesktop: 1,
        isIos: 1,
        providerName: PROVIDER.offer2,
      },
    ];

    expect(offers).toBeInstanceOf(Array);
    expect(offers.length).toBe(1);
    expect(offers).toEqual(expected);
  });

  it('should skip bad offers', () => {
    // Add bad data
    testResponse.data['test'] = {
      Offer: {
        campaign_id: 12345,
        name: 'Test',
      } as IOffer2,
    } as any;
    const offers = factory.setResponse(testResponse).build();
    const expected: ICreateOffer[] = [
      {
        externalOfferId: '15828',
        name: 'Sofi',
        description:
          'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
        requirements:
          'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
        offerUrlTemplate: 'https://some.url',
        thumbnail: 'https://some.url',
        isAndroid: 0,
        isDesktop: 1,
        isIos: 1,
        providerName: PROVIDER.offer2,
      },
    ];

    expect(offers).toBeInstanceOf(Array);
    expect(offers.length).toBe(1);
    expect(offers).toEqual(expected);
  });

  it('should be build multiple offers', () => {
    const data = JSON.parse(JSON.stringify(testResponse.data['15828'])); // Create a new offer based on the orignal to test uniqueness and order
    data.Offer.campaign_id = 123456;
    data.Offer.name = 'Test offer';
    testResponse.data['12345'] = data;
    const offers = factory.setResponse(testResponse).build();
    const expected: ICreateOffer[] = [
      {
        externalOfferId: '15828',
        name: 'Sofi',
        description:
          'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
        requirements:
          'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
        offerUrlTemplate: 'https://some.url',
        thumbnail: 'https://some.url',
        isAndroid: 0,
        isDesktop: 1,
        isIos: 1,
        providerName: PROVIDER.offer2,
      },
      {
        externalOfferId: '123456',
        name: 'Test offer',
        description:
          'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
        requirements:
          'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
        offerUrlTemplate: 'https://some.url',
        thumbnail: 'https://some.url',
        isAndroid: 0,
        isDesktop: 1,
        isIos: 1,
        providerName: PROVIDER.offer2,
      },
    ];

    expect(offers).toBeInstanceOf(Array);
    expect(offers.length).toBe(2);
    expect(
      offers.sort((a, b) => a.externalOfferId.localeCompare(b.externalOfferId)),
    ).toEqual(
      expected.sort((a, b) =>
        a.externalOfferId.localeCompare(b.externalOfferId),
      ),
    );
  });
});
