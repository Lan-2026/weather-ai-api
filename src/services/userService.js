let users = [];
let cache = null;

const getAllUsers = () => {
  if (cache) {
    console.log("Serving from cache");
    return cache;
  }

  console.log("Fetching fresh data");
  cache = users;

  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const createUser = (name, email) => {
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  cache = null; //clear cache
  return newUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
