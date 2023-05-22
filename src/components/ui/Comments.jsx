import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { orderBy } from 'lodash';

import api from '../../api';

import CommentsList from '../common/comments/CommentsList';
import AddCommentForm from '../common/comments/AddCommentForm';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]));
  };

  const handleRemoveComment = (id) => {
    api.comments
      .remove(id)
      .then((id) =>
        setComments(comments.filter((comment) => comment._id !== id))
      );
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  return (
    <>
      <div className='card mb-2'>
        <div className='card-body'>
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className='card mb-3'>
          <div className='card-body '>
            <h2>Comments</h2>
            <hr />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
