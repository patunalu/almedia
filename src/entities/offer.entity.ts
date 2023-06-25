import { OmitType } from '@nestjs/swagger';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { IOffer } from '../interfaces/offer';
import { PROVIDER } from '../interfaces/providers';

@Entity('offers')
export class Offer implements IOffer {
  // primary column for offer id
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  // offer name
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  // unique identifier for offer
  @Column({ type: 'varchar', length: 255, unique: true })
  @Generated('uuid') // To keep things simple sulg will be a generated uuid
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  slug: string;

  // offer description
  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  description: string;

  // offer requirements
  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  requirements: string;

  // offer thumbnail image url
  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  thumbnail: string;

  // indicates if offer is available for desktop
  @Column({ type: 'tinyint', width: 1, default: 0, name: 'is_desktop' })
  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1])
  isDesktop: number;

  // indicates if offer is available for android
  @Column({ type: 'tinyint', width: 1, default: 0, name: 'is_android' })
  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1])
  isAndroid: number;

  // indicates if offer is available for ios
  @Column({ type: 'tinyint', width: 1, default: 0, name: 'is_ios' })
  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1])
  isIos: number;

  // offer url template
  @Column({ type: 'varchar', length: 256, name: 'offer_url_template' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  offerUrlTemplate: string;

  // provider name - this should be static for each offer type
  // we're attaching two offer payloads - offer1, offer2
  // so for offer1 payload, this should be "offer1"
  // for offer2 payload, this should be "offer2"
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'provider_name',
  })
  @IsOptional()
  @IsString()
  @IsEnum(PROVIDER)
  providerName: string;

  // offer id from external provider
  @Column({
    type: 'varchar',
    length: 255,
    name: 'external_offer_id',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  externalOfferId: string;
}

// Omit generated properties
export class CreateOffer
  extends OmitType(Offer, ['id', 'slug'])
  implements CreateOffer {}
