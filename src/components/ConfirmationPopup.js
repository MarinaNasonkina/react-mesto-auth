import PopupWithForm from './PopupWithForm';

import useAdditionalClosePopup from '../utils/useAdditionalClosePopup';

export default function ConfirmationPopup({
  card,
  onCardDelete,
  isOpen,
  onClose,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  useAdditionalClosePopup(isOpen, onClose);

  return (
    <PopupWithForm
      name='confirmation'
      title='Вы уверены?'
      submitText='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
