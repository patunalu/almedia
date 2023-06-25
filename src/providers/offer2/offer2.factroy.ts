import { ICreateOffer } from '../../interfaces/offer';
import { IFactory } from '../../interfaces/factory';
import { IOffer2Payload } from '../../interfaces/offer2';
import { PROVIDER } from '../../interfaces/providers';
import { CreateOffer } from '../../entities/offer.entity';
import { validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

export class Offer2Factory implements IFactory<IOffer2Payload> {
  private response: IOffer2Payload;
  private logger = new Logger(Offer2Factory.name);

  setResponse(response: IOffer2Payload): IFactory<IOffer2Payload> {
    this.response = response;
    return this;
  }

  build(): ICreateOffer[] {
    const offers: ICreateOffer[] = [];
    Object.values(this.response.data).forEach((data) => {
      const { Offer: o, OS } = data;
      const offer = new CreateOffer();

      offer.externalOfferId = o.campaign_id.toString();
      offer.thumbnail = o.icon;
      offer.name = o.name;
      offer.offerUrlTemplate = o.tracking_url;
      offer.requirements = o.instructions;
      offer.description = o.description;
      offer.isAndroid = OS?.android ? 1 : 0;
      offer.isIos = OS?.ios ? 1 : 0;
      offer.isDesktop = OS?.web ? 1 : 0;
      offer.providerName = PROVIDER.offer2;

      // Validate offer
      const errors = validateSync(offer);
      if (errors.length > 0) this.logger.warn(errors);
      else offers.push(offer);
    });
    return offers;
  }
}
