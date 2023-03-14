import Quality from './Qualitiy';
import BookMark from './BookMark';

const User = (props) => {
  const {
    _id = '',
    name = '',
    qualities = [],
    profession = {},
    completedMeetings = '',
    rate = '',
    favorite = false,
    onDelete = Function.prototype,
    onChange = Function.prototype,
  } = props;

  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((item) => (
          <Quality key={item._id} {...item} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>{<BookMark status={favorite} onChange={() => onChange(_id)} />}</td>
      <td>
        <button onClick={() => onDelete(_id)} className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
