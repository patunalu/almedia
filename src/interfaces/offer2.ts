export interface IOffer2Payload {
  status: string;
  data: Record<string, IData>;
}

export interface IData {
  Offer: IOffer2;
  Country: Inclusion;
  State: Inclusion;
  City: Inclusion;
  Connection_Type: IConnectionType;
  Device: Inclusion;
  OS: OS;
}

export interface IOffer2 {
  campaign_id: number;
  store_id: any;
  tracking_type: string;
  campaign_vertical: string;
  currency_name_singular: string;
  currency_name_plural: string;
  network_epc: string;
  icon: string;
  name: string;
  tracking_url: string;
  instructions: string;
  disclaimer: any;
  description: string;
  short_description: string;
  offer_sticker_text_1: string;
  offer_sticker_text_2: any;
  offer_sticker_text_3: any;
  offer_sticker_color_1: string;
  offer_sticker_color_2: string;
  offer_sticker_color_3: string;
  sort_order_setting: any;
  category_1: string;
  category_2: any;
  amount: number;
  payout_usd: number;
  start_datetime: string;
  end_datetime: string;
  is_multi_reward: boolean;
}

export interface Inclusion {
  include: Record<string, INameCode> | Array<Record<string, INameCode>>;
  exclude: Record<string, INameCode> | Record<string, INameCode>[];
}

export interface INameCode {
  id: number;
  code: string;
  name: string;
}

export interface IConnectionType {
  cellular: boolean;
  wifi: boolean;
}

export interface OS {
  android: boolean;
  ios: boolean;
  web: boolean;
  min_ios?: number;
  max_ios?: number | null;
  min_android?: number | null;
  max_android?: number | null;
}
