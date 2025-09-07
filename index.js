require("dotenv").config();
const express = require("express"); // import du package express
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Marvel base"))
  .catch(err => console.error(err));

const app = express(); // création du serveur
app.use(
  cors({
    origin: "https://bespoke-klepon-babdc2.netlify.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le site de Marvel" });
});

const comicRoutes = require("./routes/comicRoutes");
app.use(comicRoutes);

const characterRoutes = require("./routes/characterRoutes");
app.use(characterRoutes);

const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

const favoriteRoutes = require("./routes/favoriteRoutes");
app.use(favoriteRoutes);

app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on port : ${PORT}`);
});
