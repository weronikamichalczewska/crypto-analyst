import React, { useState } from "react";

const CoinDataAnalytics = ({ weekData, monthData, yearData }) => {
  const [activeButton, setActiveButton] = useState("7d");
  const handleButtonClick = (duration) => {
    setActiveButton(duration);
  };
  if (!weekData) {
    return null;
  }

  const coinPrices =
    activeButton === "7d"
      ? weekData?.map((el) => parseFloat(el.y))
      : activeButton === "30d"
      ? monthData?.map((el) => parseFloat(el.y))
      : yearData?.map((el) => parseFloat(el.y));

  const sortedCoinPrices = coinPrices?.sort((a, b) => a - b);
  if (!sortedCoinPrices || sortedCoinPrices.length === 0) {
    return null;
  }

  console.log(sortedCoinPrices);
  const median =
    sortedCoinPrices.length % 2 === 0
      ? (sortedCoinPrices[sortedCoinPrices.length / 2 - 1] +
          sortedCoinPrices[sortedCoinPrices.length / 2]) /
        2
      : sortedCoinPrices[Math.floor(sortedCoinPrices.length / 2)];

  const avg =
    sortedCoinPrices.reduce((acc, cur) => acc + cur, 0) /
    sortedCoinPrices.length;

  const variance =
    sortedCoinPrices.reduce((acc, cur) => acc + (cur - avg) ** 2, 0) /
    sortedCoinPrices.length;

  const standardDeviation = Math.sqrt(variance);

  const coefficientOfVariation = (standardDeviation / avg) * 100;

  const renderData = () => {
    if (weekData) {
      let MedianConclusion = "";
      if (median > avg) {
        MedianConclusion =
          "The median is higher than the average, which means that most results are higher than the average, and few cases are lower and significantly deviate from typical behavior. This situation may suggest that there are few high-value transactions on the market, which increases the median, but overall the price remains stable or decreases.";
      } else if (median < avg) {
        MedianConclusion =
          "The average value (" +
          avg.toFixed(2) +
          "$) is higher than the median (" +
          median.toFixed(2) +
          "$). This means that most data (lower ones) are concentrated around the median, while few outlier values (higher ones) are located around the average. The right-skewed distribution indicates that few outlier values (higher ones) may influence the price increase in the short term, but not necessarily its sustainability in the long term.";
      } else {
        MedianConclusion =
          "The standard deviation was " +
          standardDeviation.toFixed(2) +
          ", which represents " +
          coefficientOfVariation.toFixed(2) +
          "% of the mean value. This means that the price was very volatile and unstable during the analyzed period.";
      }
      let coefficientOfVariationConclusion = "";
      if (coefficientOfVariation < 25) {
        coefficientOfVariationConclusion =
          "The standard deviation was " +
          standardDeviation.toFixed(2) +
          ", which represents " +
          coefficientOfVariation.toFixed(2) +
          "% of the mean value. This indicates that the price showed very low volatility during the analyzed period.";
      } else if (coefficientOfVariation >= 25 && coefficientOfVariation < 45) {
        coefficientOfVariationConclusion =
          "The standard deviation was " +
          standardDeviation.toFixed(2) +
          ", which represents " +
          coefficientOfVariation.toFixed(2) +
          "% of the mean value. This indicates that the price showed average volatility during the analyzed period.";
      } else if (
        coefficientOfVariation >= 45 &&
        coefficientOfVariation <= 100
      ) {
        coefficientOfVariationConclusion =
          "The standard deviation was " +
          standardDeviation.toFixed(2) +
          ", which represents " +
          coefficientOfVariation.toFixed(2) +
          "% of the mean value. This indicates that the price was highly volatile during the analyzed period.";
      } else {
        coefficientOfVariationConclusion =
          "The standard deviation was " +
          standardDeviation.toFixed(2) +
          ", which represents more than 100% of the mean value. This indicates that the price experienced very intense volatility during the analyzed period.";
      }

      return (
        <div className="bg-white border mt-2 rounded p-3 ">
          <div className="chart-button mt-1 mb-3">
            <button
              onClick={() => handleButtonClick("7d")}
              className={
                activeButton === "7d"
                  ? "btn btn-outline-secondary btn-sm active mx-1"
                  : "btn btn-outline-secondary btn-sm mx-1"
              }
            >
              7d
            </button>
            <button
              onClick={() => handleButtonClick("30d")}
              className={
                activeButton === "30d"
                  ? "btn btn-outline-secondary btn-sm active mx-1"
                  : "btn btn-outline-secondary btn-sm mx-1"
              }
            >
              30d
            </button>
            <button
              onClick={() => handleButtonClick("1y")}
              className={
                activeButton === "1y"
                  ? "btn btn-outline-secondary btn-sm active mx-1"
                  : "btn btn-outline-secondary btn-sm mx-1"
              }
            >
              1y
            </button>
          </div>
          <div className="col-sm">
            <h3>
              {activeButton === "7d"
                ? "Weekly change statistics"
                : activeButton === "30d"
                ? "Monthly change statistics"
                : "Yearly change statistics"}
            </h3>
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category">Median</span>
              <span>${median.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category">
                Arithmetic average
              </span>
              <span>${avg.toFixed(2)}</span>
            </div>
          </div>
          <hr />
          <div className="col-sm">
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category">
                Standard deviation
              </span>
              <span>{standardDeviation.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category">
                Coefficient of variation
              </span>
              <span>{coefficientOfVariation.toFixed(2)}%</span>
            </div>
            <h3 className="mt-3">Conclusions</h3>
            <p>{MedianConclusion}</p>
            <p>{coefficientOfVariationConclusion}</p>
            <p className="text-muted coin-data-category">
              Remember that the cryptocurrency exchange rate may depend on many
              factors, including the supply and demand for a particular
              cryptocurrency, the impact of global and political events, changes
              in legal regulations, acceptance by financial institutions and
              investors, as well as the technological advancement of a
              particular cryptocurrency and its applications.
            </p>
          </div>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinDataAnalytics;
