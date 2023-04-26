import PropTypes from 'prop-types';

const SelectField = (props) => {
  const {
    label,
    value,
    onChange,
    defaultOption,
    name,
    loading,
    options,
    error,
  } = props;

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ name: name, value: value });
  };

  return (
    <div className='mb-4'>
      <label className='form-label' htmlFor={name}>
        {label}
      </label>
      <select
        className={error ? 'form-select is-invalid' : 'form-select'}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value=''>
          {defaultOption}
        </option>
        {!loading &&
          options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  defaultOption: PropTypes.string,
  name: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectField;
