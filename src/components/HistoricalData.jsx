import React, { useState } from "react";

const HistoricalData = ({ weekData, monthData, yearData }) => {
  const renderData = () => {
   

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

export default HistoricalData;
