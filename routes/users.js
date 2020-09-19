const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { randomValueHex } = require("../utilities");

const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");

const users = require("../store/users");

// Create a new User
// TODO - Create email verificationToken on add
router.post(
  "/",
  validateWith({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5),
  }),
  async (req, res) => {
    const { name, email, password } = req.body;
    res.send(200);

    if (await users.getByEmail(email))
      return res
        .status(400)
        .send({ error: "A user with the given email already exists." });

    const user = {
      name,
      email,
      password,
      pub_id: randomValueHex(5),
      emailVerificationToken: randomValueHex(16),
    };
    users.add(user);

    res.sendStatus(201).send(user);
  }
);

// Update a Users details
// Decide how to validate this...
router.put("/", [auth], (req, res) => {
  users.update(req.user._id, req.body);
});

// Update a Users location
router.put(
  "/location",
  [
    auth,
    validateWith({ lat: Joi.number().required(), lon: Joi.number.required() }),
  ],
  async (req, res) => {
    const { lat, lon, timestamp } = req.body;
    await users.updateLocation(req.user._id, { lat, lon, timestamp });
    res.sendStatus(204);
  }
);

router.post("/verify:token", async (req, res) => {
  await users.confirmEmail(req.params.token);
  res.sendStatus();
});

router.post(
  "/pushNotification",
  [auth, validateWith({ token: Joi.string().required() })],
  async (req, res) => {
    await users.registerForPushNotifications(req.body._id, {
      expoPushToken: token,
    });
    res.sendStatus(204);
  }
);

module.exports = router;
