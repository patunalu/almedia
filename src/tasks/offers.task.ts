import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IProvider } from '../interfaces/providers';
import { OfferService } from '../offer.service';
import { Offer1Provider } from '../providers/offer1/offer1.provider';
import { Offer2Provider } from '../providers/offer2/offer2.provider';

@Injectable()
export class OffersTaskService {
  private readonly logger = new Logger(OffersTaskService.name);
  private providers: IProvider<any>[] = [];
  constructor(private offerService: OfferService) {
    this.providers = [new Offer1Provider(), new Offer2Provider()]; // New providers can be added to this array easily
  }
  @Cron(CronExpression.EVERY_30_SECONDS)
  fetchOffers() {
    this.logger.debug('Called every 30 seconds');
    this.providers.forEach((provider) => {
      provider
        .fetch()
        .then((res) => provider.parse(res))
        .then((offers) => this.offerService.addOffers(offers))
        .then((offers) =>
          this.logger.log(
            `${provider.constructor.name} => Added ${offers.length} Offers`,
          ),
        )
        .catch((error) => this.logger.error(error));
    });
  }
}
