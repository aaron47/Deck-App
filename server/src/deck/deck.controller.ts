import { AddCardDto } from './dto/add-card.dto';
import { AddDeckDto } from './dto/add-deck.dto';
import { DeckService } from './deck.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

@Controller('deck')
export class DeckController {
  constructor(
    @Inject('DECK_SERVICE') private readonly deckService: DeckService,
  ) {}

  @Post('add')
  async addDeck(@Body() addDeckDto: AddDeckDto) {
    return this.deckService.addDeck(addDeckDto);
  }

  @Post(':id/cards/add')
  async addCardToDeck(@Param('id') id: string, @Body() addCardDto: AddCardDto) {
    return this.deckService.addCardToDeck(id, addCardDto);
  }

  @Get('all')
  async getAllDecks() {
    return this.deckService.getAllDecks();
  }

  @Get(':id')
  async getSingularDeck(@Param('id') id: string) {
    return this.deckService.getSingularDeck(id);
  }

  @Delete(':id/delete')
  async deleteDeck(@Param('id') id: string) {
    return this.deckService.deleteDeck(id);
  }

  @Delete(':id/cards/:cardId')
  async deleteCardFromDeck(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
  ) {
    return this.deckService.deleteCardFromDeck(id, cardId);
  }
}
