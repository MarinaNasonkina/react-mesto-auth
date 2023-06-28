import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

import useAdditionalClosePopup from '../utils/useAdditionalClosePopup';
import useFormValidator from '../utils/useFormValidator';

export default function EditAvatarPopup({
  onUpdateAvatar,
  isOpen,
  onClose,
  isLoading,
}) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    isDisabled,
    setIsDisabled,
    handleChange,
  } = useFormValidator();
  const { avatar } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar });
  }

  useEffect(() => {
    if (isOpen) {
      setValues({
        avatar: '',
      });
      setErrors({});
      setIsDisabled(true);
    }
  }, [isOpen, setValues, setErrors, setIsDisabled]);

  useAdditionalClosePopup(isOpen, onClose);

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      submitText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      <input
        className={`popup__field ${errors.avatar && 'popup__field_invalid'} popup__field_type_avatar`}
        placeholder='Ссылка на картинку'
        name='avatar'
        type='url'
        value={avatar || ''}
        onChange={handleChange}
        required
      />
      <span className='popup__input-error'>{errors.avatar}</span>
    </PopupWithForm>
  );
}
