import { useNavigate } from 'react-router-dom';

import useFormValidator from '../utils/useFormValidator';
import * as auth from '../utils/auth';

export default function Login({ onLogin }) {
  const { values, errors, handleChange } = useFormValidator();
  const { email, password } = values;

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          onLogin(email);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <main className='content'>
      <section className='sign-in'>
        <h2 className='sign-in__title'>Вход</h2>
        <form
          method='post'
          name='sign-in'
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
            className={`sign-in__field ${errors.password && 'sign-in__field_invalid'}`}
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
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}
