import { validateSync } from 'class-validator';
import { CreateOffer } from '../../entities/offer.entity';
import { IFactory } from '../../interfaces/factory';
import { ICreateOffer } from '../../interfaces/offer';
import { IOffer1Payload, IOffer1Response } from '../../interfaces/offer1';
import { PROVIDER } from '../../interfaces/providers';
import { Logger } from '@nestjs/common';

export class Offer1Factory implements IFactory<IOffer1Payload> {
  private response: IOffer1Response;
  private logger = new Logger(Offer1Factory.name);

  setResponse(payload: IOffer1Payload): IFactory<IOffer1Payload> {
    this.response = payload.response;
    return this;
  }

  build(): ICreateOffer[] {
    const offers: ICreateOffer[] = [];
    this.response.offers.forEach((o) => {
      const offer = new CreateOffer();

      offer.externalOfferId = o.offer_id;
      offer.name = o.offer_name;
      offer.description = o.offer_desc;
      offer.requirements = o.call_to_action;
      offer.offerUrlTemplate = o.offer_url;
      offer.thumbnail = o.image_url || o.image_url_220x124;
      offer.isAndroid =
        o.platform === 'mobile' && o.device !== 'iphone_ipad' ? 1 : 0;
      offer.isIos =
        o.platform === 'mobile' && o.device === 'iphone_ipad' ? 1 : 0;
      offer.isDesktop = o.platform === 'desktop' ? 1 : 0;
      offer.providerName = PROVIDER.offer1;

      // Validate offer
      const errors = validateSync(offer);
      if (errors.length > 0) this.logger.warn(errors);
      else offers.push(offer);
    });
    return offers;
  }
}
