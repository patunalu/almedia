export interface IOffer1Payload {
  query: IOffer1Query;
  response: IOffer1Response;
}

export interface IOffer1Query {
  pubid: string;
  appid: number;
  country: string;
  platform: string;
}

export interface IOffer1Response {
  currency_name: string;
  offers_count: number;
  offers: IOffer1[];
}

export interface IOffer1 {
  offer_id: string;
  offer_name: string;
  offer_desc: string;
  call_to_action: string;
  disclaimer: string;
  offer_url: string;
  offer_url_easy: string;
  payout: number;
  payout_type: string;
  amount: number;
  image_url: string;
  image_url_220x124: string;
  countries: string[];
  platform: 'desktop' | 'mobile';
  device: string;
  category: Record<string, string>;
  last_modified: number;
  preview_url: string;
  package_id: string;
  verticals: IVertical[];
}

export interface IVertical {
  vertical_id: string;
  vertical_name: string;
}
