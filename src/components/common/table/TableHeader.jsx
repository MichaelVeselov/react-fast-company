import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';

const TableHeader = (props) => {
  const { selectedSort, onSort, columns } = props;

  const [activeHeader, setActiveHeader] = useState({
    name: 'name',
    order: 'asc',
  });

  useEffect(() => {
    setActiveHeader({ name: selectedSort.path, order: selectedSort.order });
  }, [selectedSort]);

  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort((selectedSort) => ({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  const renderHeader = (item) => {
    if (item.path === activeHeader.name) {
      return activeHeader.order === 'asc' ? (
        <span>
          {item.name} <i className='bi bi-caret-up-fill'></i>
        </span>
      ) : (
        <span>
          {item.name} <i className='bi bi-caret-down-fill'></i>
        </span>
      );
    }
    return <span>{item.name}</span>;
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope='col'
          >
            {renderHeader(columns[column])}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
