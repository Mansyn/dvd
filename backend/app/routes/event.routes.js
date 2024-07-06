// routes/events.js

const { authJwt } = require("../middlewares");
const controller = require("../controllers/event.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/event", [authJwt.verifyToken, authJwt.isAdmin], controller.create);

  app.get("/api/event", controller.list);

  app.get("/api/event/:id", controller.read);

  app.patch("/api/event/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  app.delete("/api/event/:id",
    [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
};
