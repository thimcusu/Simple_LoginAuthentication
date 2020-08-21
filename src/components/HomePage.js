import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import useFetchUsers from "../api/useFetchUsers";
import { getCurrentUser, logOut } from "../actions/userAction";
import UserTable from "../containers/UserTable";
import Header from "./Header";

function HomePage({ history }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state);
  const { users, apiCallStatus: callApiUserStatus } = useFetchUsers();
  const isLoading = callApiUserStatus !== 0;

  useEffect(() => {
    fetchCurrentUSer();
  }, []);
  const fetchCurrentUSer = async () => {
    try {
      await dispatch(getCurrentUser());
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogOut = () => {
    dispatch(logOut());
    history.push("/login");
  };
  return (
    <>
      {currentUser ? (
        <div className="app">
          <Header currentUser={currentUser.user} onLogOut={handleLogOut} />
          <div className="container-fluid table-wrapper">
            <UserTable users={users} isLoading={isLoading}></UserTable>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border m-5" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

HomePage.propTypes = {
  history: PropTypes.object,
};

export default HomePage;
