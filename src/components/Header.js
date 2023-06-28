import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

export default function Header({ email, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu(e) {
    setIsMenuOpen(e.target.checked);
  }

  function closeOnSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }

  return (
    <>
      <div className={`header__menu-top ${isMenuOpen ? 'header__menu-top_opened' : ''}`}>
        <p className='header__email'>{email}</p>
        <Link
          to='/sign-in'
          className='header__sign-out'
          onClick={closeOnSignOut}
        >
          Выйти
        </Link>
      </div>
      <header className='header'>
        <nav className='header__nav'>
          <Link to='/' aria-label='В свой профиль.'>
            <div className='header__logo'></div>
          </Link>
          <Routes>
            <Route
              path='/sign-up'
              element={
                <Link to='/sign-in' className='header__link'>
                  Войти
                </Link>
              }
            />
            <Route
              path='/sign-in'
              element={
                <Link to='/sign-up' className='header__link'>
                  Регистрация
                </Link>
              }
            />
            <Route
              path='/'
              element={
                <>
                  <input
                    id='toggle'
                    className='header__menu-toggle'
                    type='checkbox'
                    value={isMenuOpen}
                    onChange={toggleMenu}
                  />
                  <label htmlFor='toggle' className='header__button-container'>
                    <div className='header__button'></div>
                  </label>
                  <div className='header__menu'>
                    <p className='header__email'>{email}</p>
                    <Link
                      to='/sign-in'
                      className='header__sign-out'
                      onClick={onSignOut}
                    >
                      Выйти
                    </Link>
                  </div>
                </>
              }
            />
          </Routes>
        </nav>
      </header>
    </>
  );
}
