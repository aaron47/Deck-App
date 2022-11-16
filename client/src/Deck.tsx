import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createCard } from './shared/createCard';
import { Deck as TDeck } from './shared/createCard';
import { deleteCard } from './shared/deleteCard';
import { getDeck } from './shared/getDeck';

const Deck = () => {
  const [cards, setCards] = useState<string[]>();
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [text, setText] = useState('');
  const { id } = useParams();

  async function handleCreateCard(e: React.FormEvent, text: string) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(id!, text);
    setText('');
    setCards(serverCards);
  }

  async function handleDeleteCard(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cardIndex: number
  ) {
    e.preventDefault();
    await deleteCard(id!, cardIndex);
    setCards([...cards!].filter((card, index) => index !== cardIndex));
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!id) return;
      const newDeck = await getDeck(id!);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [id]);

  return (
    <div className="App">
      {/* {isLoading && <p>Loading...</p>}
      {isError && <p>An error has occured. Please try again later.</p>} */}

      <ul className="decks">
        {cards?.map((card, index: number) => (
          <div key={index}>
            <li>
              <button onClick={(e) => handleDeleteCard(e, index)}>X</button>
              {card}
            </li>
          </div>
        ))}
      </ul>

      <form onSubmit={(e) => handleCreateCard(e, text)}>
        <label htmlFor="card-text">Deck Title</label>
        <input
          type="text"
          id="card-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button>Create Card</button>
      </form>
    </div>
  );
};

export default Deck;
