const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  console.log(`\n Name: ${username} \n ID: ${id} \n Room: ${room} \n `);
  return user;
}

// User leaves Chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get Room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers,
};
