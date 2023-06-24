import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { validator } from '../../utils/validator';

import { useQuality } from '../../hooks/useQuality';
import { useProfession } from '../../hooks/useProfession';
import { useAuth } from '../../hooks/useAuth';

import TextField from '../common/form/TextField';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/MultiSelectField';
import CheckBoxField from '../common/form/CheckBoxField';

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    name: '',
    qualities: [],
    license: false,
  });
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const { signUp } = useAuth();

  const { qualities } = useQuality();
  const { professions, isLoading } = useProfession();

  const qualityList = qualities.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const professionList = professions.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is required' },
      isEmail: { message: 'Email is not valid' },
    },
    name: {
      isRequired: { message: 'Name is required' },
      minLength: {
        message: 'Name must be at least 3 characters long',
        value: 3,
      },
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
    profession: { isRequired: { message: 'Profession is required' } },
    qualities: { isRequired: { message: 'Qualities are required' } },
    license: {
      isRequired: {
        message: 'You cannot use our service without agreement confirmation',
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

    const newData = {
      ...data,
      qualities: data.qualities.map((item) => item.value),
    };

    try {
      await signUp(newData);
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
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
    <form onSubmit={handleSubmit}>
      <TextField
        label='Email'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />

      <TextField
        label='Name'
        name='name'
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />

      <TextField
        label='Password'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <SelectField
        label='Choose your profession...'
        value={data.profession}
        onChange={handleChange}
        defaultOption='Choose...'
        name='profession'
        loading={isLoading}
        options={professionList}
        error={errors.profession}
      />

      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
        ]}
        value={data.sex}
        name='sex'
        label='Choose your gender...'
        onChange={handleChange}
      />

      <MultiSelectField
        options={qualityList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name='qualities'
        label='Choose your qualities...'
        error={errors.qualities}
      />

      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name='license'
        error={errors.license}
      >
        Confirm your agreement
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

export default RegisterForm;
