/*
This uses json-server to fake REST API quickly
*/
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const jwt = require("jsonwebtoken");
const fs = require("fs");
const userDb = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./db.json"), "UTF-8")
);

const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 1000);
});

const SECRET_KEY = "123456789";
const expiresIn = 1440;

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isAuthenticated({ username, password }) {
  return userDb.users.findIndex(
    (user) => user.username === username && user.password === password
  );
}
server.post("/auth/login", (req, res) => {
  console.log(111);
  const { username, password } = req.body;
  if (isAuthenticated({ username, password }) === -1) {
    const status = 401;
    const message = "Incorrect username or password";
    return res.status(status).json({ status, message });
  }
  const accessToken = createToken({ username, password });
  return res.status(200).json({
    token: accessToken,
  });
});

//register
server.use("/users/", (req, res, next) => {
  console.log(222);
  if (req.method === "POST") {
    const error = validateResgister(req.body);
    if (error) {
      res.status(400).send(error);
    }
    const { username, email } = req.body;
    const duplicateUser = userDb.users.filter((user) => {
      return user.username === username || user.email === email;
    }).length;
    if (duplicateUser) {
      res.status(409).send({
        message: "Duplicated username or email",
      });
    }
  }
  next();
});

server.get("/me", (req, res, next) => {
  const token = req.headers.authorization;
  if (token === undefined || token.split(" ")[0] !== "Bearer") {
    res.status(401).json("Error in authorization format");
    return;
  }
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decode) => {
    if (err) return res.json({ error: "Invalid token" });
    const currentUser = userDb.users.find(
      (user) => user.username === decode.username
    );
    res.status(200).json({
      user: currentUser,
    });
  });
  next();
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  console.log(req.originalUrl);
  if (req.method === "POST" && req.originalUrl.endsWith("/users")) {
    console.log(req.originalUrl);
    next();
  } else {
    const token = req.headers.authorization;
    if (token === undefined || token.split(" ")[0] !== "Bearer") {
      console.log(333);
      res.status(401).json("Error in authorization format");
      return;
    }
    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decode) => {
      if (err) return res.json({ error: "Invalid token" });
      return decode;
    });
    next();
  }
});

server.post("/users/", (req, res, next) => {
  const error = validateResgister(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    next();
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

function validateResgister(user) {
  if (!user.first_name) return "First name is required.";
  if (!user.last_name) return "Last name is required.";
  if (!user.username) return "Username is required.";
  if (!user.email) return "Email is required.";
  if (!user.password) return "Password is required.";
  return "";
}
