import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { loadUsers } from "../actions/userAction";
import { useCallback, useEffect } from "react";

function useFetchUsers() {
  const distpatch = useDispatch();
  const { users, apiCallStatus } = useSelector((state) => state, shallowEqual);
  const boundAction = useCallback(() => {
    return distpatch(loadUsers());
  }, [distpatch]);
  useEffect(() => {
    if (!users || users.length === 0) {
      boundAction();
    }
  }, [boundAction, users]);
  return {
    users,
    fetchData: boundAction,
    apiCallStatus,
  };
}

export default useFetchUsers;
