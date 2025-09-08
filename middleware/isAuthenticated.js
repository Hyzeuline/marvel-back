const User = require("../models/User");

// Middleware pour vérifier si l'utilisateur est connecté
const isAuthenticated = async (req, res, next) => {
  try {
    // Lire le token depuis le cookie
    const token = req.cookies?.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: token manquant" });
    }

    // Vérifier que le token existe dans la DB
    const findUser = await User.findOne({ token });

    if (!findUser) {
      return res.status(401).json({ message: "Unauthorized: token invalide" });
    }

    req.user = findUser; // transmettre l'utilisateur
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = isAuthenticated;
