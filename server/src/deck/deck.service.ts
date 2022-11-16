import { AddCardDto } from './dto/add-card.dto';
import { AddDeckDto } from './dto/add-deck.dto';
import { DeckRepository } from './deck.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeckService {
  constructor(
    @Inject('DECK_REPOSITORY') private readonly deckRepository: DeckRepository,
  ) {}

  async addDeck(addDeckDto: AddDeckDto) {
    const deck = await this.deckRepository.addDeck(addDeckDto);
    return deck;
  }

  async getAllDecks() {
    return this.deckRepository.getAllDecks();
  }

  async getSingularDeck(id: string) {
    return this.deckRepository.findOneById(id);
  }

  async addCardToDeck(id: string, addCardDto: AddCardDto) {
    return this.deckRepository.addCardToDeck(id, addCardDto);
  }

  async deleteDeck(id: string) {
    return this.deckRepository.deleteDeck(id);
  }

  async deleteCardFromDeck(deckId: string, cardId: string) {
    return this.deckRepository.deleteCardFromDeck(deckId, cardId);
  }
}
