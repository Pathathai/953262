// Mock user data for demonstration
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

function findByUsernameAndPassword(username, password) {
  return users.find((u) => u.username === username && u.password === password) || null;
}

module.exports = { findByUsernameAndPassword };