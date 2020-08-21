import React, { useState } from "react";
import PropTypes from "prop-types";

import { USERS_PER_PAGE } from "../constants/userConstant";
import Pagination from "../components/Pagination";
import UsersList from "../components/UsersList";

function UserTable({ users = [], isLoading = true }) {
  const [currentPage, setCurrentPage] = useState(1);
  const getCurrentUsers = () => {
    const indexOfLast = currentPage * USERS_PER_PAGE;
    const indexOfFirst = indexOfLast - USERS_PER_PAGE;
    const currentUsers = users.slice(indexOfFirst, indexOfLast);
    return currentUsers;
  };

  const handleChangePage = (event) => {
    const pageNumber = parseInt(event.target.name);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title justify-content-center align-content-center">
            List of Users
          </h4>
          <div className="table-responsive">
            <table
              className={`table table-striped ${isLoading ? "loading" : ""}`}
            >
              <thead className={`${isLoading ? "loading" : ""}`}>
                <tr>
                  <th>Avatar</th>
                  <th>User</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                </tr>
              </thead>

              {isLoading ? (
                <tbody className="loading">
                  <tr>
                    <td>
                      <div className="d-flex justify-content-center table-loading">
                        <div className="spinner-border m-5" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <UsersList users={getCurrentUsers()} />
              )}
            </table>
          </div>
        </div>
      </div>
      <Pagination
        onChangePage={handleChangePage}
        currentPage={currentPage}
        count={
          users.length === 0 ? 1 : Math.ceil(users.length / USERS_PER_PAGE)
        }
      />
    </div>
  );
}

UserTable.propTypes = {
  users: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default UserTable;
