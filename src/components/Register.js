import { Link, useNavigate } from 'react-router-dom';

import AuthForm from './AuthForm';

import useFormValidator from '../utils/useFormValidator';
import * as auth from '../utils/auth';

export default function Register({ onRegister }) {
  const { values, errors, handleChange } = useFormValidator();
  const { email, password } = values;

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(email, password)
      .then(() => {
        onRegister(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        onRegister(false);
      });
  }

  return (
    <main className='content'>
      <section className='sign-in'>
        <h2 className='sign-in__title'>Регистрация</h2>
        <AuthForm
          formName='sign-up'
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          email={email}
          password={password}
          submitText='Зарегистрироваться'
        />
        <Link to='/sign-in' className='sign-in__link'>
          Уже зарегистрированы? Войти
        </Link>
      </section>
    </main>
  );
}
