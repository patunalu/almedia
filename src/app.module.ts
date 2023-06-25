import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OfferService } from './offer.service';
import { OffersTaskService } from './tasks/offers.task';
// import { Offer1TaskService } from './tasks/offer1.task';
// import { Offer2TaskService } from './tasks/offer2.task';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [Offer],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Offer]),
  ],
  controllers: [],
  providers: [
    OfferService,
    OffersTaskService,
    // Offer1TaskService,
    // Offer2TaskService,
  ],
})
export class AppModule {}
