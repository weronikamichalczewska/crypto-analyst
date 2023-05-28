import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CoinInfo = () => {
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
      let conclusion = "";
      if (coinData.market_data.price_change_percentage_24h < 0) {
        if (coinData.market_data.price_change_percentage_7d > 0) {
          conclusion =
            "The current price is " +
            coinData.market_data.current_price.usd.toLocaleString() +
            " USD with a 24-hour volume of " +
            coinData.market_data.total_volume.usd.toLocaleString() +
            " USD. This represents a " +
            coinData.market_data.price_change_percentage_24h.toFixed(1) +
            "% decrease in price over the last 24 hours and a " +
            coinData.market_data.price_change_percentage_7d.toFixed(1) +
            "% increase in price over the last 7 days.";
        } else {
          conclusion =
            "The current price is " +
            coinData.market_data.current_price.usd.toLocaleString() +
            " USD with a 24-hour volume of " +
            coinData.market_data.total_volume.usd.toLocaleString() +
            " USD. This represents a " +
            coinData.market_data.price_change_percentage_24h.toFixed(1) +
            "% decrease in price over the last 24 hours and a " +
            coinData.market_data.price_change_percentage_7d.toFixed(1) +
            "% decrease in price over the last 7 days.";
        }
      } else if (coinData.market_data.price_change_percentage_24h > 0) {
        if (coinData.market_data.price_change_percentage_7d < 0) {
          conclusion =
            "The current price is " +
            coinData.market_data.current_price.usd.toLocaleString() +
            " USD with a 24-hour volume of " +
            coinData.market_data.total_volume.usd.toLocaleString() +
            " USD. This represents a " +
            coinData.market_data.price_change_percentage_24h.toFixed(1) +
            "% increase in price over the last 24 hours and a " +
            coinData.market_data.price_change_percentage_7d.toFixed(1) +
            "% decrease in price over the last 7 days.";
        } else {
          conclusion =
            "The current price is " +
            coinData.market_data.current_price.usd.toLocaleString() +
            " USD with a 24-hour volume of " +
            coinData.market_data.total_volume.usd.toLocaleString() +
            " USD. This represents a " +
            coinData.market_data.price_change_percentage_24h.toFixed(1) +
            "% increase in price over the last 24 hours and a " +
            coinData.market_data.price_change_percentage_7d.toFixed(1) +
            "% increase in price over the last 7 days.";
        }
      } else {
        conclusion = "The current price remains stable today.";
      }
      let title = "";
      if (coinData.market_data.price_change_percentage_24h < 0) {
        title =
          "The price of " +
          coinData.name +
          " (" +
          coinData.symbol.toUpperCase() +
          ") decreased today.";
      } else if (coinData.market_data.price_change_percentage_24h > 0) {
        title =
          "The price of " +
          coinData.name +
          " (" +
          coinData.symbol.toUpperCase() +
          ") increased today.";
      } else {
        title =
          "The price of " +
          coinData.name +
          " (" +
          coinData.symbol.toUpperCase() +
          ") remains stable today.";
      }
      return (
        <div className="bg-white border mt-2 rounded p-3">
          <div className="col-sm">
            <div className="d-flex flex-column">
              <h3>{title}</h3>
              <p>{conclusion}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinInfo;
