import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IOffer1Payload } from 'src/interfaces/offer1';
import { Offer1Provider } from 'src/providers/offer1/offer1.provider';
import { IProvider } from '../interfaces/providers';
import { OfferService } from '../offer.service';

// This option is useful when different providers are called at diffferent interval,
// m and can also make it easier to pass queries to the fetch method for customisation
@Injectable()
export class Offer1TaskService {
  private readonly logger = new Logger(Offer1TaskService.name);
  private provider: IProvider<IOffer1Payload>;
  constructor(private offerService: OfferService) {
    this.provider = new Offer1Provider();
  }
  @Cron(CronExpression.EVERY_30_SECONDS)
  async fetchOffers() {
    this.logger.debug('Called every 30 minies');
    await this.provider
      .fetch()
      .then((res) => this.provider.parse(res))
      .then((offers) => this.offerService.addOffers(offers))
      .then((offers) => this.logger.log(`Added ${offers.length} Offers`))
      .catch((error) => this.logger.error(error));
  }
}
