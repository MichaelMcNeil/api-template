const compression = require("compression");
const config = require("config");
const helmet = require("helmet");
const mongo = require("./store/mongo");
const express = require("express");
const app = express();

const authApi = require("./routes/auth");
const usersApi = require("./routes/users");

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

// Routes
app.use("/auth", authApi);
app.use("/users", usersApi);

mongo.init(config.get("db")).then(() => {
  const server = app.listen(
    process.env.PORT || config.get("port"),
    function () {
      console.log(`Server started on port ${port}...`);
    }
  );
});
