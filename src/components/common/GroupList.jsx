import PropTypes from 'prop-types';

const GroupList = (props) => {
  const { items, valueProperty, contentProperty, selectedItem, onItemSelect } =
    props;

  return (
    <ul className='list-group'>
      {Object.keys(items).map((key) => {
        const currentItem = items[key];

        const activeClass = currentItem === selectedItem ? 'active' : '';

        return (
          <li
            key={currentItem[valueProperty]}
            className={`list-group-item ${activeClass}`}
            role='button'
            onClick={() => onItemSelect(currentItem)}
          >
            {currentItem[contentProperty]}
          </li>
        );
      })}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func.isRequired,
};

export default GroupList;
