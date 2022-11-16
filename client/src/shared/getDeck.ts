import axios from 'axios';
import { API_URL } from './api-url';
import { Deck } from './createCard';

export async function getDeck(id: string) {
  const res = await axios.get<Deck>(`${API_URL}/${id}`);
  return res.data;
}
