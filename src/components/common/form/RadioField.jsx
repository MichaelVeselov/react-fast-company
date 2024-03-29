import PropTypes from 'prop-types';

function RadioField(props) {
  const { options, name, onChange, value, label } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ name: name, value: value });
  };

  return (
    <div className='mb-4'>
      <label className='form-label'>{label}</label>
      <div>
        {options.map((option) => (
          <div
            key={`${option.name}_${option.value}`}
            className='form-check form-check-inline'
          >
            <input
              className='form-check-input'
              type='radio'
              name={name}
              id={`${option.name}_${option.value}`}
              value={option.value}
              checked={option.value === value}
              onChange={handleChange}
              label='Choose your gender'
            />
            <label
              className='form-check-label'
              htmlFor={`${option.name}_${option.value}`}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default RadioField;
