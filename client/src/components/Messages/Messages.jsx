import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";

// eslint-disable-next-line react/prop-types
const Messages = ({ socket, username, room }) => {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: Date.now(),
        room: room,
        author: username,
        message: currentMessage,
        time: moment().format("h:mm a"),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //   console.log(data);
      setMessageList((list) => [...list, data]);
    });

    socket.on("notification", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const getIdClass = (name) => {
    if (name === username) {
      return "you";
    } else {
      if (name === "BOT") {
        return "bot";
      } else {
        return "other";
      }
    }
  };

  return (
    <>
      <div className="col-auto col-sm-9 col-md-9 col-lg-10 d-flex flex-column justify-content-between chat_section">
        <ScrollToBottom className="chat-messages d-flex flex-column" mode="bottom">
          {messageList.map((messageContent) => (
            <div
              key={messageContent.id}
              className="message"
              // id={username === messageContent.author ? "you" : "other"}
              id={getIdClass(messageContent.author)}
            >
              <p className="meta">
                {username === messageContent.author ? "You" : messageContent.author}
                <span>{messageContent.time}</span>
              </p>
              <p className="text">{messageContent.message}</p>
            </div>
          ))}
        </ScrollToBottom>
        {/* Send Message */}
        <div className="msg-field-container">
          <div className="msg_field d-flex ">
            <input
              type="text"
              placeholder="Enter Message..."
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button id="send_btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;

Messages.propTypes = {
  socket: PropTypes.object,
  username: PropTypes.string,
  room: PropTypes.string,
};
