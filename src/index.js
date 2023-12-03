const express = require("express");
const bodyParser = require("body-parser");
swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./docs/swagger-output.json");

// ORM
const sequelize = require("./database/connexion");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Movie Route
const movieRouter = require("./routes/movieRoute");

// Category Route
const categoryRoute = require("./routes/categoryRoute");

const app = express();

// User body parser for json object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Port
const PORT = process.env.PORT || 3000;

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: { persistAuthorization: true },
  })
);
app.use("/api/movies", movieRouter);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
