import { useState } from 'react';

export default function useFormValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: e.target.validationMessage });
    setIsDisabled(!e.target.form.checkValidity());
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    isDisabled,
    setIsDisabled,
    handleChange,
  };
}
