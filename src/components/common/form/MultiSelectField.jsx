import Select from 'react-select';

import PropTypes from 'prop-types';

const MultiSelectField = (props) => {
  const { options, onChange, name, label, defaultValue, error } = props;

  const handleChange = (value) => {
    onChange({ name: name, value: value });
  };

  return (
    <div className='mb-4'>
      <label className='form-label'>{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        name={name}
        options={options}
        className={
          error ? 'basic-multi-select is-invalid' : 'basic-multi-select'
        }
        classNamePrefix='select'
        onChange={handleChange}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
  error: PropTypes.string,
};

export default MultiSelectField;
