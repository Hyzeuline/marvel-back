const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemType: {
    type: String,
    enum: ["comic", "character"], // tu peux ajouter d’autres types si besoin
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId, // référence à ton comic ou character
    required: true,
  },
  title: String,
  description: String,
  image: {
    url: { type: String, required: true }, // URL de l’image
    // tu peux ajouter d’autres champs si nécessaire, par exemple width, height
  },
});

// Pour éviter qu'un utilisateur ajoute deux fois le même favori
FavoriteSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
