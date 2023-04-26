import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import * as yup from 'yup';

import api from '../../../api';

import TextField from '../../common/form/TextField';
import SelectField from '../../common/form/SelectField';
import RadioField from '../../common/form/RadioField';
import MultiSelectField from '../../common/form/MultiSelectField';

const EditUserPage = (props) => {
  const { userId } = props;
  const history = useHistory();

  const [user, setUser] = useState();
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState({});
  const [userQualities, setUserQualities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const validateSchema = yup.object().shape({
    qualities: yup
      .array()
      .of(yup.object())
      .min(1, 'At least one quality is required'),

    profession: yup.object().shape({
      _id: yup.string().required('Profession is required'),
      name: yup.string().required('Profession is required'),
    }),

    email: yup
      .string()
      .required('Email is required')
      .email('Email is not valid'),

    name: yup
      .string()
      .required('Name is required')
      .min(2, 'The name cannot be shorter than 2 characters'),
  });

  useEffect(() => {
    setLoading(true);
    api.users.getById(userId).then((data) => {
      setUser(data);
      setUserQualities(transformQualities(data.qualities));
      setLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading(true);
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    api.qualities.fetchAll().then((data) => {
      setQualities(data);
      setLoading(false);
    });
  }, []);

  const transformQualities = (qualities = []) => {
    return qualities.map((quality) => ({
      value: quality._id,
      label: quality.name,
    }));
  };

  const handleChange = (target) => {
    let value = target.value;

    if (target.name === 'profession') {
      value = {
        _id: target.value,
        name: professions.find((item) => item._id === target.value).name,
      };
    }

    if (target.name === 'qualities') {
      const quailitiyArray = Object.keys(qualities).map((qualityName) => ({
        ...qualities[qualityName],
      }));

      value = target.value.map((item) => ({
        _id: item.value,
        name: item.label,
        color: quailitiyArray.find((quality) => quality._id === item.value)
          .color,
      }));
    }

    setUser((prevState) => ({ ...prevState, [target.name]: value }));
  };

  const validate = () => {
    validateSchema
      .validate(user)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));

    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
    // eslint-disable-next-line
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    api.users
      .update(user._id, user)
      .then(history.replace(`/users/${user._id}`))
      .catch((error) => console.log(error));
  };

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <form onSubmit={handleSubmit}>
            <TextField
              label='Name'
              name='name'
              value={user.name}
              onChange={handleChange}
              error={errors.name}
            />

            <TextField
              label='Email'
              name='email'
              value={user.email}
              //onChange={handleChange}
              onChange={handleChange}
              error={errors.email}
            />

            <RadioField
              options={[
                { name: 'Male', value: 'male' },
                { name: 'Female', value: 'female' },
              ]}
              value={user.sex}
              name='sex'
              label='Choose your gender...'
              onChange={handleChange}
            />

            <SelectField
              label='Choose your profession...'
              value={user.profession._id}
              onChange={handleChange}
              defaultOption='Choose...'
              name='profession'
              loading={loading}
              options={professions}
              error={errors.profession}
            />

            <MultiSelectField
              options={qualities}
              onChange={handleChange}
              defaultValue={userQualities}
              name='qualities'
              label='Choose your qualities...'
              error={errors.qualities}
            />

            <button
              type='submit'
              className='btn btn-primary w-100 mx-auto'
              disabled={!isValid}
            >
              Update data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

EditUserPage.propTypes = {
  userId: PropTypes.string,
};

export default EditUserPage;
