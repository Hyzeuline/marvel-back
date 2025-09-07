const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const isAuthenticated = require("../middleware/isAuthenticated");

// Ajouter un favori
router.post("/favorite", isAuthenticated, fileUpload(), async (req, res) => {
  try {
    const { title, description, itemType, itemId } = req.body;

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
    });

    // Gestion image si présente
    if (req.files?.picture) {
      const convertToBase64 = file =>
        `data:${file.mimetype};base64,${file.data.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(
        convertToBase64(req.files.picture),
        { folder: `marvel/favorites/${req.user._id}` }
      );

      newFavorite.image = {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    }

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
      user: req.user._id, // sécurité : il ne supprime que ses favoris
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favori introuvable" });
    }

    // Si le favori avait une image stockée dans Cloudinary, on la supprime
    if (favorite.image?.public_id) {
      await cloudinary.uploader.destroy(favorite.image.public_id);
    }

    return res.status(200).json({ message: "Favori supprimé" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
