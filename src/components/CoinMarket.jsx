import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

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

  const getSentimentColor = (sentiment) => {
    if (sentiment > 60) return "success";
    if (sentiment > 30) return "info";
    if (sentiment > 0) return "warning";
    if (sentiment > -30) return "danger";
    return "dark";
  };

  const getSentimentDescription = (sentiment) => {
    if (sentiment > 60)
      return "This indicates a strong positive sentiment among the community, which could influence the price positively.";
    if (sentiment > 30)
      return "There is a moderately positive sentiment in the community, which could result in a favourable market condition.";
    if (sentiment > 0)
      return "The sentiment is neutral. This suggests that the market is in a state of equilibrium.";
    if (sentiment > -30)
      return "There is a moderately negative sentiment in the community, which might result in a less favourable market condition.";
    return "This indicates a strong negative sentiment among the community, which could influence the price negatively.";
  };

  const renderData = () => {
    if (coinData) {
      const sentiment = Math.floor(coinData.sentiment_votes_up_percentage);
      const sentimentColor =
        sentiment > 60 ? "rgba(15, 174, 150, 1)" : getSentimentColor(sentiment);
      return (
        <div className="bg-white border mt-2 rounded p-3">
          <div className="col-sm">
            <div className="d-flex flex-column">
              <h3 style={{ marginBottom: "20px" }}>
                What is the market sentiment of {coinData.name} today?
              </h3>
              <div
                className="progress"
                style={{ height: "20px", marginBottom: "10px" }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${sentiment}%`,
                    backgroundColor: sentimentColor,
                  }}
                  aria-valuenow={sentiment}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >{`${sentiment}%`}</div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginBottom: "20px" }}
              >
                <small>0% (Bearish)</small>
                <small>50% (Neutral)</small>
                <small>100% (Bullish)</small>
              </div>
              <p>{getSentimentDescription(sentiment)}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinMarket;
