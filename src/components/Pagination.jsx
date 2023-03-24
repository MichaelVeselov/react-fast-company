import PropTypes from 'prop-types';

import { range } from 'lodash';

const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;

  const pages = range(1, pageCount + 1);

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {pages.map((page) => {
          const activeClass = page === currentPage ? ' active' : '';
          return (
            <li className={`page-item ${activeClass}`} key={`page_${page}`}>
              <button className='page-link' onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
