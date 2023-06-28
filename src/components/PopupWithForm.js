export default function PopupWithForm({
  name,
  title,
  submitText,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isDisabled,
  children,
}) {
  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`}
    >
      <div className='popup__container popup__container_for_form'>
        <button
          className='popup__close-button'
          aria-label='Закрыть и отменить изменения.'
          type='button'
          onClick={onClose}
        ></button>
        <h2 className='popup__title'>{title}</h2>
        <form
          method='post'
          name={name}
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type='submit'
            className={`popup__submit-button ${isLoading ? 'loading' : ''}`}
            {...(isDisabled && {disabled:true})}
          >
            {isLoading ? 'Сохранение' : submitText}
          </button>
        </form>
      </div>
    </section>
  );
}
