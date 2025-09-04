const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_MARVEL = "https://lereacteur-marvel-api.herokuapp.com";

//Get a list of comics

router.get("/comics", async (req, res) => {
  try {
    const limit = 100;
    let queries = "";

    if (req.query.name) {
      queries = queries + "&title=" + req.query.title;
    }

    if (req.query.page) {
      let skip = (req.query.page - 1) * limit;
      queries = queries + "&skip=" + skip;
    }
    const response = await axios.get(
      `${API_MARVEL}/comics?apiKey=${process.env.SECRET_API_KEY}${queries}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//"Get a list of comics containing a specific character"
router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_MARVEL}/comics/${req.params.characterId}`,
      {
        params: { apiKey: process.env.SECRET_API_KEY },
      }
    );
    res.status(200).json(response.data);
    return res.status(200).json(CharacterComicsList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// test postman {"message": "It seems there is no comics assigned to this character id. 🤷‍♂️"}

//Get all informations of specific comic
router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_MARVEL}/comic/${req.params.comicId}`,
      {
        params: { apiKey: process.env.SECRET_API_KEY },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// //test postman {
//     "thumbnail": {
//         "path": "http://i.annihil.us/u/prod/marvel/i/mg/9/10/53cd2c7612d2f",
//         "extension": "jpg"
//     },
//     "_id": "5fce13de78edeb0017c92d68",
//     "title": "100th Anniversary Special (2014) #1",
//     "description": "Just in time for the release of their SEVENTH epic motion picture, the Guardians of the Galaxy are celebrating their 100th Anniversary...by taking on the THE SILVER GALACTUS!",
//     "__v": 0
// }

module.exports = router;
