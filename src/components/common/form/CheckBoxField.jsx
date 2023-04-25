import PropTypes from 'prop-types';

const CheckBoxField = (props) => {
  const { name, value, onChange, error, children } = props;

  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  return (
    <div className='form-check mb-4'>
      <input
        className={error ? 'form-check-input is-invalid' : 'form-check-input'}
        type='checkbox'
        value=''
        id={name}
        checked={value}
        onChange={handleChange}
      />
      <label className='form-check-label' htmlFor={name}>
        {children}
      </label>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CheckBoxField;
