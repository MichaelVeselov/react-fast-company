import { useState, useEffect } from 'react';

import { validator } from '../utils/validator';

import TextField from '../components/TextField';

const LoginPage = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    console.log(data);
  };

  const validate = () => {
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
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <h3 className='mb-4'>Login</h3>
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
            <button
              type='submit'
              className='btn btn-primary w-100 mx-auto'
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
