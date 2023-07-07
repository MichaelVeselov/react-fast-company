import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//import * as yup from 'yup';

import { validator } from '../../utils/validator';

import { login } from '../../store/users';

import TextField from '../common/form/TextField';
import CheckBoxField from '../common/form/CheckBoxField';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  /*   const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /(?=.*[A-Z])/,
        'Password must contain at least one capital letter'
      )
      .matches(/(?=.*[0-9])/, 'Password must contain at least one digit')
      .matches(
        /(?=.*[!@#$%^&*])/,
        'Password must contain at least one special character !@#$%^&*'
      )
      .matches(/(?=.{8,})/, 'Password must be at least 8 characters long'),

    email: yup
      .string()
      .required('Email is required')
      .email('Email is not valid'),
  }); */

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is required' },
      isEmail: { message: 'Email is not valid' },
    },
    password: {
      isRequired: { message: 'Password is required' },
      isCapitalSymbol: {
        message: 'Password must contain at least one capital letter',
      },
      isContainDigit: {
        message: 'Password must contain at least one digit',
      },
      minLength: {
        message: 'Password must be at least 8 characters long',
        value: 8,
      },
    },
  };

  const handleChange = (target) => {
    const { name, value } = target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    const redirect = history.location.state?.from.pathname || '/';

    dispatch(login({ payload: data, redirect }));
  };

  const validate = () => {
    /*     validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message })); */
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
    // eslint-disable-next-line
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Email'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />

      <TextField
        label='Password'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>
        Stay on the system?
      </CheckBoxField>

      <button
        type='submit'
        className='btn btn-primary w-100 mx-auto'
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
