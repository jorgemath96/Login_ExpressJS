
const userLogin = (data) => {
  return {
    username: data.username,
    password: data.password,
  }
};

const userRegister = (data) => {
  return {
    username: data.username,
    password: data.password,
    email: data.email,
    name: data.name,
  }
};


// Exportar módulos...
module.exports = {userLogin, userRegister};