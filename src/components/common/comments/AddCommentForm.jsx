import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../../api';

import { validator } from '../../../utils/validator';

import SelectField from '../form/SelectField';
import TextAreaField from '../form/TextAreaField';

const initialState = { userId: '', content: '' };

const AddCommentForm = (props) => {
  const { onSubmit } = props;

  const [data, setData] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Author of the post is required...',
      },
    },
    content: {
      isRequired: {
        message: 'Post content is required...',
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData(initialState);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  const arrayOfUsers =
    users && users.map((user) => ({ label: user.name, value: user._id }));

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          name='userId'
          value={data.userId}
          onChange={handleChange}
          defaultOption='Select user...'
          options={arrayOfUsers}
          error={errors.userId}
        />

        <TextAreaField
          value={data.content || ''}
          onChange={handleChange}
          name='content'
          label='New post'
          error={errors.content}
        />
        <div className='d-flex justify-content-end'>
          <button className='btn btn-primary'>Publish</button>
        </div>
      </form>
    </div>
  );
};
AddCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddCommentForm;
