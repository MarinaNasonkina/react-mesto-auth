export default function AuthForm({
  formName,
  handleSubmit,
  handleChange,
  errors,
  email,
  password,
  submitText,
}) {
  return (
    <form
      method='post'
      name={formName}
      className='sign-in__form'
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className={`sign-in__field ${errors.email && 'sign-in__field_invalid'}`}
        placeholder='Email'
        name='email'
        type='email'
        maxLength='40'
        value={email || ''}
        onChange={handleChange}
        required
      />
      <span className='sign-in__input-error'>{errors.email}</span>
      <input
        className={`sign-in__field ${
          errors.password && 'sign-in__field_invalid'
        }`}
        placeholder='Пароль'
        name='password'
        type='password'
        maxLength='40'
        value={password || ''}
        onChange={handleChange}
        required
      />
      <span className='sign-in__input-error'>{errors.password}</span>
      <button type='submit' className='sign-in__submit-button'>
        {submitText}
      </button>
    </form>
  );
}
