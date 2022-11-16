import { API_URL } from './api-url';
import axios from 'axios';

export async function deleteCard(deckId: string, cardIndex: number) {
  await axios.delete(`${API_URL}/${deckId}/cards/${cardIndex}`);
}
