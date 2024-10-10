const axios = require("axios");
const CryptoData = require("../models/cryptoModel");

async function fetchCryptoData() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,matic-network,ethereum";
  const response = await axios.get(url);
  return response.data.map(coin => ({
    coinId: coin.id,
    price: coin.current_price,
    marketCap: coin.market_cap,
    change24h: coin.price_change_percentage_24h,
  }));
}

const runCryptoJob = async () => {
  const cryptoData = await fetchCryptoData();
  cryptoData.forEach(async coin => {
    const newRecord = new CryptoData(coin);
    await newRecord.save();
  });
};

module.exports = runCryptoJob;
