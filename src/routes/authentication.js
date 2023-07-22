const { Router } = require('express');
const router = Router();
var { userLogin, userRegister } = require('../models/auth.model');
const { signin, signup, logout } = require('../controllers/authentication.controller');


router.post('/signin', async (req, res) => {
  const user = await userLogin(req.body);
  try {
    let state = await signin(user);
    if (!state.auth) return res.status(401).json(state);
    res.cookie('token', state.token, { httpOnly: true });
    return res.status(200).json(state);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ auth: false, message: 'Server error' });
  }
});

router.post('/signup', async (req, res) => {
  const user = await userRegister(req.body);
  try {
    let state = await signup(user);
    if (!state.auth) return res.status(401).json(state);
    res.cookie('token', state.token, { httpOnly: true });
    return res.status(200).json(state);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ auth: false, message: 'Server error' });
  }
});

router.get('/logout', async (req, res) => {
  try {
    await logout(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ auth: false, message: 'Server error' });
  }
});


module.exports = router;