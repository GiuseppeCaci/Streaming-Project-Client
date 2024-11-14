import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UseFetchGetAllUser = (selector, fetchAction, token) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchAction(token));
  }, [dispatch, fetchAction, token]);

  return { users, loading, error };
};

export default UseFetchGetAllUser;
