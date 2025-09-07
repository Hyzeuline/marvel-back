require("dotenv").config();
const express = require("express"); // import du package express
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Marvel base"))
  .catch(err => console.error(err));

cloudinary.config({
  //je connecte mon drive à mon fichier
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const app = express(); // création du serveur
app.use(cors());
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
