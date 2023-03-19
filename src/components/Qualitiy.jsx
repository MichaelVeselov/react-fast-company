const Quality = (props) => {
  const { color = '', name = '' } = props;

  return <span className={'badge m-1 bg-' + color}>{name}</span>;
};

export default Quality;
