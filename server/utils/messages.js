const moment = require("moment");

const formatMessage = (username, text) => {
  return {
    id: Date.now(),
    author: username,
    message: text,
    time: moment().format("h:mm a"),
  };
};

module.exports = formatMessage;
