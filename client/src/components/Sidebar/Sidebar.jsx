import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ socket, username, room }) => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    // Get users info
    socket.on("roomUsers", ({ users }) => {
      setUsersList(users);
      console.log(users);
    });
  }, [socket]);

  return (
    <>
      <div className="col-auto col-sm-3 col-md-3 col-lg-2 side_bar">
        {/* Chat Details */}
        <div className="chat_details text-white pt-2 mt-2">
          <h3>
            <i className="fas fa-user"></i>
            <span className="fs-4 ms-3">Name :</span>
          </h3>
          <h2 className="fs-4 ms-3">{username} </h2>
          <h3>
            <i className="fas fa-comments"></i>
            <span className="fs-4 ms-3">Room ID :</span>
          </h3>
          <h2 className="fs-4 ms-3" id="room-name">
            {room}
          </h2>
        </div>
        {/* Users Logged */}
        <div className="users text-white pt-5">
          <h3>
            <i className="fas fa-users"></i>
            <span className="fs-4 ms-3">Users</span>
          </h3>
          <div className="users_list mt-4">
            <ul id="users">
              {usersList.map((user, index) => (
                <li key={index} className="fs-4">
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Messages */}
    </>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  socket: PropTypes.object,
};
