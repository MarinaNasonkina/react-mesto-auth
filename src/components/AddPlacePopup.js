import { useEffect } from 'react';

import PopupWithForm from './PopupWithForm';

import useAdditionalClosePopup from '../utils/useAdditionalClosePopup';
import useFormValidator from '../utils/useFormValidator';

export default function AddPlacePopup({
  onAddPlace,
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
  const { name, link } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: '',
        link: '',
      });
      setErrors({});
      setIsDisabled(true);
    }
  }, [isOpen, setValues, setErrors, setIsDisabled]);

  useAdditionalClosePopup(isOpen, onClose);

  return (
    <PopupWithForm
      name='add-place'
      title='Новое место'
      submitText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      <input
        className={`popup__field ${errors.name && 'popup__field_invalid'} popup__field_type_place-name`}
        placeholder='Название'
        name='name'
        minLength='2'
        maxLength='30'
        value={name || ''}
        onChange={handleChange}
        required
      />
      <span className='popup__input-error'>{errors.name}</span>
      <input
        className={`popup__field ${errors.link && 'popup__field_invalid'} popup__field_type_place-img`}
        placeholder='Ссылка на картинку'
        name='link'
        type='url'
        value={link || ''}
        onChange={handleChange}
        required
      />
      <span className='popup__input-error'>{errors.link}</span>
    </PopupWithForm>
  );
}
