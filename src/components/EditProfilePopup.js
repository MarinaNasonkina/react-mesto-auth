import { useContext, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext';

import useAdditionalClosePopup from '../utils/useAdditionalClosePopup';
import useFormValidator from '../utils/useFormValidator';

export default function EditProfilePopup({
  onUpdateUser,
  isOpen,
  onClose,
  isLoading,
}) {
  const user = useContext(CurrentUserContext);
  const {
    values,
    setValues,
    errors,
    setErrors,
    isDisabled,
    setIsDisabled,
    handleChange,
  } = useFormValidator();
  const { name, about } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: user.name,
        about: user.about,
      });
      setErrors({});
      setIsDisabled(false);
    }
  }, [isOpen, setValues, setErrors, setIsDisabled, user]);

  useAdditionalClosePopup(isOpen, onClose);

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      submitText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      <input
        className={`popup__field ${errors.name && 'popup__field_invalid'} popup__field_type_name`}
        placeholder='Имя'
        name='name'
        minLength='2'
        maxLength='40'
        value={name || ''}
        onChange={handleChange}
        required
      />
      <span className='popup__input-error'>{errors.name}</span>
      <input
        className={`popup__field ${errors.about && 'popup__field_invalid'} popup__field_type_about`}
        placeholder='О себе'
        name='about'
        minLength='2'
        maxLength='200'
        value={about || ''}
        onChange={handleChange}
        required
      />
      <span className='popup__input-error'>{errors.about}</span>
    </PopupWithForm>
  );
}
