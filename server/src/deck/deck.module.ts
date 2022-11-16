import { DeckRepository } from './deck.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';
import { Deck, DeckSchema } from './shemas/deck.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
  ],
  controllers: [DeckController],
  providers: [
    {
      provide: 'DECK_SERVICE',
      useClass: DeckService,
    },
    {
      provide: 'DECK_REPOSITORY',
      useClass: DeckRepository,
    },
  ],
})
export class DeckModule {}
