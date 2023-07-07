import { useState, createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import { getCurrentUserId } from '../store/users';

import commentService from '../services/comment.service';

const CommentContext = createContext();

export const useComment = () => {
  return useContext(CommentContext);
};

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, [userId]);

  async function createComment(data) {
    const comment = {
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId,
      _id: nanoid(),
    };

    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id)
        );
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <CommentContext.Provider
      value={{ comments, createComment, removeComment, isLoading }}
    >
      {children}
    </CommentContext.Provider>
  );
};

CommentProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
