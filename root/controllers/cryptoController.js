const CryptoData = require("../models/cryptoModel");
const { calculateStandardDeviation } = require("../utils/helpers");

const getLatestCryptoData = async (req, res) => {
  const { coin } = req.query;
  const latestData = await CryptoData.findOne({ coinId: coin }).sort({
    timestamp: -1,
  });
  if (latestData) {
    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
};

const getPriceStandardDeviation = async (req, res) => {
  const { coin } = req.query;
  const prices = await CryptoData.find({ coinId: coin })
    .sort({ timestamp: -1 })
    .limit(100)
    .select("price");
  const priceValues = prices.map(record => record.price);

  if (priceValues.length > 0) {
    const deviation = calculateStandardDeviation(priceValues);
    res.json({ deviation });
  } else {
    res.status(404).json({ message: "Not enough data" });
  }
};

module.exports = { getLatestCryptoData, getPriceStandardDeviation };
