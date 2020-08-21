import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getCurrentUser } from "../actions/userAction";
import { useCallback, useEffect } from "react";

function useFetchCurrentUser() {
  const distpatch = useDispatch();
  const { currentUser, apiCallStatus } = useSelector(
    (state) => state,
    shallowEqual
  );
  const boundAction = useCallback(() => {
    return distpatch(getCurrentUser());
  }, [distpatch]);
  useEffect(() => {
    if (!currentUser.user) {
      boundAction();
    }
  }, [boundAction, currentUser]);
  return {
    currentUser: currentUser.user,
    fetchData: boundAction,
    apiCallStatus,
  };
}

export default useFetchCurrentUser;
