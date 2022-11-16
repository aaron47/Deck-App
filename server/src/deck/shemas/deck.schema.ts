import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Deck extends Document {
  @Prop()
  title: string;

  @Prop()
  cards: string[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
