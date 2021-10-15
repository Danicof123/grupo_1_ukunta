const {Router} = require('express');
const router = Router();

const {imagesCarousel} = require('../../controllers/api/carouselController');

/* /api/carousel */
router.get('/', imagesCarousel);

module.exports = router;
