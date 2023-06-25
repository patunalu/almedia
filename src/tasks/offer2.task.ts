import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IOffer2Payload } from 'src/interfaces/offer2';
import { Offer2Provider } from 'src/providers/offer2/offer2.provider';
import { IProvider } from '../interfaces/providers';
import { OfferService } from '../offer.service';

// This option is useful when the providers are called at diffferent interval,
// and can also make it easier to pass queries to the fetch method for customisation
@Injectable()
export class Offer2TaskService {
  private readonly logger = new Logger(Offer2TaskService.name);
  private provider: IProvider<IOffer2Payload>;
  constructor(private offerService: OfferService) {
    this.provider = new Offer2Provider();
  }
  @Cron(CronExpression.EVERY_5_SECONDS)
  async fetchOffers() {
    this.logger.debug('Called every 5 seconds');
    await this.provider
      .fetch()
      .then((res) => this.provider.parse(res))
      .then((offers) => this.offerService.addOffers(offers))
      .then((offers) => this.logger.log(`Added ${offers.length} Offers`))
      .catch((error) => this.logger.error(error));
  }
}
