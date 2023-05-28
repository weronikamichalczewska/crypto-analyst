import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CoinMarket = () => {
  const [coinData, setCoinData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const data = await response.json();
      setCoinData(data);
    };
    fetchData();
  }, []);

  const renderData = () => {
    if (coinData) {
      let sentiment = "";
      if (
        coinData.sentiment_votes_up_percentage >
        coinData.sentiment_votes_down_percentage
      ) {
        sentiment =
          "The community is bullish as more than " +
          coinData.sentiment_votes_up_percentage.toFixed(0) +
          "% of users are feeling good about " + coinData.name + " ("+ coinData.symbol.toUpperCase() + ") today.";
      } else {
        sentiment =
        "The community is bearish as more than " +
        coinData.sentiment_votes_down_percentage.toFixed(0) +
        "% of users are feeling bad about " + coinData.name + " ("+ coinData.symbol.toUpperCase() + ") today.";
      }
      return (
        <div className="bg-white border mt-2 rounded p-3">
          <div className="col-sm">
            <div className="d-flex flex-column">
              <h3>What is the market sentiment of {coinData.name} today?</h3>
              <p>{sentiment}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinMarket;
