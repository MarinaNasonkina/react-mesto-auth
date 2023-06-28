import useAdditionalClosePopup from '../utils/useAdditionalClosePopup';

export default function InfoTooltip({ isOpen, isRegisterOk, onClose }) {
  useAdditionalClosePopup(isOpen, onClose);

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_info-tooltip`}
    >
      <div className='popup__container popup__container_for_info-tooltip'>
        <button
          className='popup__close-button'
          aria-label='Закрыть.'
          type='button'
          onClick={onClose}
        ></button>
        <div
          className={`popup__info-img ${isRegisterOk ? 'popup__info-img_success' : ''}`}
        ></div>
        <h2 className='popup__title popup__title_for_info-tooltip'>
          {isRegisterOk
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
}
