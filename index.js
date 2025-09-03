require("dotenv").config();
const express = require("express"); // import du package express
const cors = require("cors");
require("dotenv").config();

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

app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on port : ${PORT}`);
});
