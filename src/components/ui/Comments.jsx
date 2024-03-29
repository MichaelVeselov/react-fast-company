import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { orderBy } from 'lodash';
import { nanoid } from 'nanoid';

import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  createComment,
  removeComment,
} from '../../store/comments';
import { getCurrentUserId } from '../../store/users';

import CommentsList from '../common/comments/CommentsList';
import AddCommentForm from '../common/comments/AddCommentForm';

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCommentsList(userId));
    // eslint-disable-next-line
  }, [userId]);

  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());
  const currentUserId = useSelector(getCurrentUserId());

  const handleSubmit = (data) => {
    const comment = {
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId,
      _id: nanoid(),
    };

    dispatch(createComment(comment));
  };

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
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
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
