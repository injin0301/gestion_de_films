const express = require("express");

// JS is able to read a format JSON
const bodyParser = require("body-parser");

// Swagger
swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./docs/swagger-output.json");

// Upload
const fileUpload = require("express-fileupload");

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

// Image Route
const imageRoute = require("./routes/imageRoute");

// Account Route
const accountRoute = require("./routes/accountRoute");

// Auth Route
const authRoute = require("./routes/authRoute");

const app = express();

// User body parser for json object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Port
const PORT = process.env.PORT || 3000;

// Swagger URL
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: { persistAuthorization: true },
  })
);

// file upload middleware
app.use(fileUpload());

app.use(express.static("public"));

// Movies URL
app.use("/api/movies", movieRouter);

// Categories URL
app.use("/api/categories", categoryRoute);

// Image URL
app.use("/api/image", imageRoute);

// Account URL
app.use("/api/account", accountRoute);

// Auth URL
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
