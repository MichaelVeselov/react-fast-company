import PropTypes from 'prop-types';
import SingleComment from './SingleComment';

const CommentsList = (props) => {
  const { comments, onRemove } = props;

  return comments.map((comment) => (
    <SingleComment key={comment._id} {...comment} onRemove={onRemove} />
  ));
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
};

export default CommentsList;
