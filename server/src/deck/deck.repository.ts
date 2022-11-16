import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddCardDto } from './dto/add-card.dto';
import { Deck } from './shemas/deck.schema';

@Injectable()
export class DeckRepository {
  constructor(@InjectModel(Deck.name) private readonly deck: Model<Deck>) {}

  async addDeck(data: Partial<Deck>): Promise<Deck> {
    const newDeck = new this.deck(data);
    return newDeck.save();
  }

  async addCardToDeck(id: string, addCardDto: AddCardDto): Promise<Deck> {
    const currentDeck = await this.findOneById(id);
    currentDeck.cards.push(addCardDto.text);
    await currentDeck.save();
    return currentDeck;
  }

  async getAllDecks(): Promise<Deck[]> {
    return this.deck.find();
  }

  async findOneById(id: string): Promise<Deck> {
    const deckToSearch = this.deck.findById(id);

    if (!deckToSearch)
      throw new BadRequestException(`Deck with id ${id} does not exist`);

    return deckToSearch;
  }

  async deleteDeck(id: string): Promise<Deck> {
    return this.deck.findByIdAndDelete(id);
  }

  async deleteCardFromDeck(deckId: string, cardId: string) {
    const deck = await this.findOneById(deckId);
    deck.cards.splice(parseInt(cardId), 1);
    return deck.save();
  }
}
