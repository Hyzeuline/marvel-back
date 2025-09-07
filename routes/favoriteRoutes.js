const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const isAuthenticated = require("../middleware/isAuthenticated");

// Ajouter un favori
router.post("/favorite", isAuthenticated, async (req, res) => {
  try {
    const { title, description, itemType, itemId, image } = req.body;

    console.log("Cookies reçus :", req.cookies);
    console.log("Body :", req.body);

    // Empêcher les doublons
    const existing = await Favorite.findOne({
      user: req.user._id,
      itemType,
      itemId,
    });
    if (existing) {
      return res.status(400).json({ message: "Déjà dans les favoris" });
    }

    const newFavorite = new Favorite({
      title,
      description,
      itemType,
      itemId,
      user: req.user._id,
      image, // prend directement l'image envoyée par le front
    });

    await newFavorite.save();
    return res.status(201).json(newFavorite);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Récupérer les favoris de l’utilisateur connecté
router.get("/favorite", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id });
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Supprimer un favori
router.delete("/favorite/:id", isAuthenticated, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favori introuvable" });
    }

    return res.status(200).json({ message: "Favori supprimé" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
