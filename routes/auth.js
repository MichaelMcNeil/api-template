const { OAuth2Client } = require("google-auth-library");
const config = require("config");
const Joi = require("joi");
const jwt = require("../utilities/jwt");
const express = require("express");
const router = express.Router();

const users = require("../store/users");

const validateWith = require("../middleware/validation");

router.post(
  "/email",
  validateWith({ email: Joi.string().email(), password: Joi.string().min(5) }),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await users.getByEmail(email);
    if (!user || user.password !== password)
      return res.status(400).send({ error: "Invalid email or password." });

    const token = jwt.sign(user);
    res.send(token);
  }
);

router.post(
  "/google",
  validateWith({ idToken: Joi.string() }),
  async (req, res) => {
    const { idToken } = req.body;

    const CLIENT_ID = config.get("googleClientId");
    const client = new OAuth2Client(CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await users.getByEmail(email);
    if (user) user = await users.confirmGoogleSync(user._id);
    else
      user = await users.add({ name, email, picture, has_synced_google: true });

    const token = jwt.sign(user);
    res.send(token);
  }
);

module.exports = router;
