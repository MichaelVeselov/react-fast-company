const TableDataRow = (props) => {
  const {
    id = '',
    name = '',
    qualities = [],
    profession = '',
    completedMeetings = '',
    rate = '',
    deleteRecord = Function.prototype,
  } = props;

  const renderQualities = (arr) => {
    return (
      <div>
        {arr.map((item) => (
          <span key={item.name} className={`badge bg-${item.color} me-2`}>
            {item.name}
          </span>
        ))}
      </div>
    );
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{renderQualities(qualities)}</td>
      <td>{profession}</td>
      <td>{completedMeetings}</td>
      <td>{`${rate} / 5`}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={() => deleteRecord(id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default TableDataRow;
