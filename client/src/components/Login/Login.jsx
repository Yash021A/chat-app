import { useState } from "react";
import io from "socket.io-client";
import Chats from "./../Chats/Chats";
import "./Login.css";

const socket = io.connect("https://yash-chat-app-ultra-server.onrender.com");

const Login = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [loginDetails, setLoginDetails] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    const newEntry = {
      username,
      room,
    };
    setLoginDetails(newEntry);
    console.log(loginDetails);
    setUsername("");
    setRoom("");
    setShowChat(true);
  };

  return (
    <>
      {!showChat ? (
        <div className="card_wrapper">
          <div className="card">
            <h1>JOIN A CHAT</h1>
            <form onSubmit={submitForm}>
              <div className="txt_field">
                <input
                  type="text"
                  autoComplete="off"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <span></span>
                <label htmlFor="username">Name</label>
              </div>

              <div className="txt_field">
                <input
                  type="text"
                  autoComplete="off"
                  name="room_id"
                  id="room_id"
                  value={room}
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                  required
                />
                <span></span>
                <label htmlFor="room_id">Room ID</label>
              </div>

              <button id="login_btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Chats socket={socket} username={loginDetails.username} room={loginDetails.room} />
      )}
    </>
  );
};

export default Login;
