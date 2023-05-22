import PropTypes from 'prop-types';

const TextAreaField = (props) => {
  const { label, name, value, onChange, error } = props;

  const handleChange = (event) => {
    const { target } = event;
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className='mb-3'>
      {label && (
        <label className='form-label' htmlFor={name}>
          {label}
        </label>
      )}

      <div className='input-group has-validation'>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={error ? 'form-control is-invalid' : 'form-control'}
        />
        {error && <div className='invalid-feedback '>{error}</div>}
      </div>
    </div>
  );
};

TextAreaField.defaultProps = {
  type: 'text',
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextAreaField;
