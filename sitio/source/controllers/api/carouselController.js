//DB
const db = require('../../database/models');

// API
const imagesCarousel = async (req, res) => {
    res.json(await db.carousel.findAll({}));
};

module.exports = {
    imagesCarousel,
};
