/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import LoginForm from '../components/ui/LoginForm';
import RegisterForm from '../components/ui/RegisterForm';

const LoginPage = () => {
  const { type } = useParams();

  const [formType, setFormType] = useState(
    type === 'register' ? 'register' : 'login'
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    );
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {formType === 'register' ? (
            <>
              <h3 className='mb-4'>Register</h3>
              <RegisterForm />
              <p className='m-2'>
                Already have account?
                <a
                  role='button'
                  className='ms-2 text-decoration-none fw-bolder'
                  onClick={toggleFormType}
                >
                  Sign in!
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className='mb-4'>Login</h3>
              <LoginForm />

              <p className='m-2'>
                Don't have account?
                <a
                  role='button'
                  className='ms-2 text-decoration-none fw-bolder'
                  onClick={toggleFormType}
                >
                  Sign up!
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
