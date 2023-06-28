import useAdditionalClosePopup from '../utils/useAdditionalClosePopup';

export default function ImagePopup({ card, isOpen, onClose }) {
  useAdditionalClosePopup(isOpen, onClose);

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_full-screen-place`}
      aria-label='Место на весь экран.'
    >
      <div className='popup__container popup__container_for_place'>
        <button
          className='popup__close-button'
          aria-label='Закрыть.'
          type='button'
          onClick={onClose}
        ></button>
        <img
          src={`${card.link || '#'}`}
          alt={`${card.name || ''}`}
          className='popup__image'
        />
        <p className='popup__subtitle'>{card.name}</p>
      </div>
    </section>
  );
}
