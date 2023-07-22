const pool = require('./database.controller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signin = async (data) => {
  const { username, password } = data;
  const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (user.length > 0) {
    const correctPassword = await bcrypt.compare(password, user[0].password);
    if (correctPassword) {
      const token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY);
      return { auth: true, token: token };
    } else {
      return { auth: false, message: 'Incorrect username or password' };
    }
  } else {
    return { auth: false, message: 'Incorrect username or password' };
  }
};

const signup = async (data) => {
  const { username, password, email, name } = data;
  const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (!user.length > 0) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = {
      username: username,
      password: hashPassword,
      email: email,
      name: name
    };
    await pool.query('INSERT INTO users SET ?', [newUser]);
    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
    return { auth: true, token: token };
  } else {
    return { auth: false, message: 'The user already exists' };
  }
};

const logout = async (req, res) => {
  res.cookie('token', null, { httpOnly: true });
  res.status(200).json({ auth: false, token: null });
};


module.exports = { signin, signup, logout };