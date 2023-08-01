import PropTypes from "prop-types";
import Navbar from "./../Navbar/Navbar";
import Sidebar from "./../Sidebar/Sidebar";
import Messages from "./../Messages/Messages";
import "./Chats.css";

const Chats = ({ socket, username, room }) => {
  if (username !== "" && room !== "") {
    socket.emit("join_room", { username, room });
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar socket={socket} username={username} room={room} />
          <Messages socket={socket} username={username} room={room} />
        </div>
      </div>
    </>
  );
};

export default Chats;

Chats.propTypes = {
  socket: PropTypes.object,
  username: PropTypes.string,
  room: PropTypes.string,
};
