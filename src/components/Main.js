import { useContext } from 'react';

import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDeleteClick,
}) {
  const user = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__info'>
          <img
            src={`${user.avatar || '#'}`}
            alt='Аватар профиля.'
            className='profile__avatar'
          />
          <button
            onClick={onEditAvatar}
            className='profile__avatar-button'
            aria-label='Сменить аватар.'
            type='button'
          ></button>
          <div className='profile__description'>
            <h1 className='profile__name'>{user.name}</h1>
            <button
              onClick={onEditProfile}
              className='profile__edit-button'
              aria-label='Редактировать профиль.'
              type='button'
            ></button>
            <p className='profile__about'>{user.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className='profile__add-button'
          aria-label='Добавить место.'
          type='button'
        ></button>
      </section>
      <section className='cards' aria-label='Фотогалерея.'>
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteClick={onCardDeleteClick}
          />
        ))}
      </section>
    </main>
  );
}
