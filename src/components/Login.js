import { useNavigate } from 'react-router-dom';

import AuthForm from './AuthForm';

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
        <AuthForm
          formName='sign-in'
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          email={email}
          password={password}
          submitText='Войти'
        />
      </section>
    </main>
  );
}
