import React from "react";
import PropTypes from "prop-types";
import { AVATAR_URL_DEFAULT } from "../constants/userConstant";

function UsersList({ users = [] }) {
  return (
    <tbody>
      {users &&
        users.map((user) => (
          <tr key={user.id}>
            <td>
              <img
                className="md-avatar rounded-circle"
                src={user.avatarUrl ? user.avatarUrl : AVATAR_URL_DEFAULT}
                alt={`${user.first_name} ${user.last_name}`}
              />
            </td>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
    </tbody>
  );
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersList;
