import { useState } from 'react';

import PropTypes from 'prop-types';

const TextField = (props) => {
  const { label, type, name, value, error, onChange } = props;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ name: name, value: value });
  };

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <input
          className={error ? 'form-control is-invalid' : 'form-control'}
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {type === 'password' && (
          <button
            className='btn btn-outline-primary'
            type='button'
            onClick={toggleShowPassword}
          >
            <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
          </button>
        )}
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text',
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextField;
