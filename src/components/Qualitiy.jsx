const Quality = (props) => {
  const { color = '', name = '', _id = '' } = props;

  return (
    <span className={'badge m-1 bg-' + color} key={_id}>
      {name}
    </span>
  );
};

export default Quality;
