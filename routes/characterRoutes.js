const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_MARVEL = "https://lereacteur-marvel-api.herokuapp.com";

// Get a list of characters

router.get("/characters", async (req, res) => {
  try {
    const limit = 100;
    let queries = "";
    if (req.query.name) {
      queries = queries + "&name=" + req.query.name;
    }

    if (req.query.page) {
      let skip = (req.query.page - 1) * limit;
      queries = queries + "&skip=" + skip;
    }
    const response = await axios.get(
      `${API_MARVEL}/characters?apiKey=${process.env.SECRET_API_KEY}${queries}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// test postman {
//     "count": 1493,
//     "limit": 100,
//     "results": [
//         {
//             "thumbnail": {
//                 "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
//                 "extension": "jpg"
//             },
//             "comics": [
//                 "5fce213378edeb0017c9602f",
//                 "5fce213478edeb0017c96040",
//                 "5fce20fe78edeb0017c95fb7",
//                 "5fce20e078edeb0017c95f01",
//                 "5fce20ab78edeb0017c95e56",
//                 "5fce207678edeb0017c95d8b",
//                 "5fce207678edeb0017c95d8c",
//                 "5fce202078edeb0017c95c8e",
//                 "5fce292678edeb0017c97e05",
//                 "5fce31ee78edeb0017c9a305",
//                 "5fce31dc78edeb0017c9a2b0",
//                 "5fce31c778edeb0017c9a276"
//             ],
//             "_id": "5fcf91f4d8a2480017b91453",
//             "name": "3-D Man",
//             "description": "",
//             "__v": 0
//         }, etc.

//Get a the infos of a specific character

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_MARVEL}/character/${req.params.characterId}`,
      {
        params: { apiKey: process.env.SECRET_API_KEY },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//test postman {
//     "thumbnail": {
//         "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
//         "extension": "jpg"
//     },
//     "comics": [
//         "5fce213378edeb0017c9602f",
//         "5fce213478edeb0017c96040",
//         "5fce20fe78edeb0017c95fb7",
//         "5fce20e078edeb0017c95f01",
//         "5fce20ab78edeb0017c95e56",
//         "5fce207678edeb0017c95d8b",
//         "5fce207678edeb0017c95d8c",
//         "5fce202078edeb0017c95c8e",
//         "5fce292678edeb0017c97e05",
//         "5fce31ee78edeb0017c9a305",
//         "5fce31dc78edeb0017c9a2b0",
//         "5fce31c778edeb0017c9a276"
//     ],
//     "_id": "5fcf91f4d8a2480017b91453",
//     "name": "3-D Man",
//     "description": "",
//     "__v": 0
// }

module.exports = router;
