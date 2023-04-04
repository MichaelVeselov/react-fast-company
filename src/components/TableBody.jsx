import PropTypes from 'prop-types';

import { get } from 'lodash';

const TableBody = (props) => {
  const { data, columns } = props;

  const renderContent = (item, column) => {
    const property = columns[column];
    if (property.component) {
      const component = property.component;
      if (typeof component === 'function') {
        return component(item);
      }
      return component;
    }
    return get(item, property.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => {
            return <td key={column}>{renderContent(item, column)}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableBody;
