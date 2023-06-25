export interface IOffer {
  id: number;
  slug: string;
  name: string;
  description: string;
  requirements: string;
  thumbnail: string;
  isDesktop: number;
  isAndroid: number;
  isIos: number;
  offerUrlTemplate: string;
  providerName: string;
  externalOfferId: string;
}

export type ICreateOffer = Omit<IOffer, 'slug' | 'id'>;
