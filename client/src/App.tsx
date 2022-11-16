import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import './App.css';
import { API_URL } from './shared/api-url';
import { Deck } from './shared/createCard';

const queryClient = new QueryClient();

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<Deck[]>([]);

  const addDeck = (title: string) => {
    return axios.post(`${API_URL}/add`, { title });
  };

  const deleteDeck = async (id: string) => {
    await axios.delete(`${API_URL}/${id}/delete`);
  };

  const getAllDecks = () => {
    return axios.get<Deck[]>(`${API_URL}/all`);
  };

  const { data, isLoading, isError } = useQuery(['decks'], getAllDecks, {
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation(addDeck);
  const deleteDeckMutation = useMutation(deleteDeck, {
    onMutate: async (deckId) => {
      await queryClient.cancelQueries({ queryKey: ['decks'] });
      const previousDecks = queryClient.getQueryData(['decks']);
      queryClient.setQueryData(['decks'], (oldDeck) => oldDeck !== deckId);

      return { previousDecks };
    },
  });

  useEffect(() => {
    setDecks(data?.data!);
  });

  function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate(title);
    setTitle('');
  }

  function handleDeleteDeck(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.preventDefault();
    deleteDeckMutation.mutate(id);
  }

  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p>An error has occured. Please try again later.</p>}

        <ul className="decks">
          {decks?.map((deck) => (
            <div key={deck._id}>
              <li>
                <button onClick={(e) => handleDeleteDeck(e, deck._id)}>
                  X
                </button>
                <Link to={`/deck/${deck._id}`}>{deck.title}</Link>
              </li>
            </div>
          ))}
        </ul>

        <form onSubmit={handleCreateDeck}>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            type="text"
            id="deck-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button>Create Deck</button>
        </form>
      </div>
    </div>
  );
}

export default App;
