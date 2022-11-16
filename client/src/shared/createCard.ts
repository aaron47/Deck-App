import { API_URL } from './api-url';
import axios from 'axios';

export interface Deck {
  _id: string;
  title: string;
  cards: string[];
}

export async function createCard(id: string, text: string) {
  const res = await axios.post<Deck>(`${API_URL}/${id}/cards/add`, { text });
  console.log(res.data);
  return res.data;
}
