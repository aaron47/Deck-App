import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <div>
        <a href="/">FlashCardSage</a>
      </div>

      <div>
        <a href="/decks">Decks</a>
      </div>

      <div>
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Header;
