const express = require("express");
const {
  getLatestCryptoData,
  getPriceStandardDeviation,
} = require("../controllers/cryptoController");
const router = express.Router();

router.get("/stats", getLatestCryptoData);
router.get("/deviation", getPriceStandardDeviation);

module.exports = router;
