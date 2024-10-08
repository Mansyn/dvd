const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");
const { ServerApiVersion } = require('mongodb');

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ["https://dvdbrew.com"] // Production environment
  : ["http://localhost:4200", "http://localhost:8081"];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: [process.env.COOKIE_SECRET || "default-secret"],
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    sameSite: "lax", // Allows cookies to be sent with cross-origin requests
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(dbConfig.URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'public')));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/event.routes")(app);

// Catch-all route to serve the Angular app for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
