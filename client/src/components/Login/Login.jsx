import { useEffect,useState } from "react";
import io from "socket.io-client";
import Chats from "./../Chats/Chats";
import "./Login.css";
import axios from "axios";

const socket = io.connect("https://yash-chat-app-ultra-server.onrender.com");

const Login = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [loginDetails, setLoginDetails] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [serverStatus, setServerStatus] = useState("dead");

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

  const fetchServerStatus = async () => {
    try {
      // const response = await axios("http://localhost:3011/status");
      const response = await axios("https://yash-chat-app-ultra-server.onrender.com/status");
      setServerStatus(response.data.server);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchServerStatus();
  }, []);


 return (
    <>
      {!showChat ? (
        <>
          <ul className="server-info">
            <li className={`status ${serverStatus}`}>Server</li>
          </ul>
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
        </>
      ) : (
        <Chats socket={socket} username={loginDetails.username} room={loginDetails.room} />
      )}
    </>
  );
};

export default Login;
