import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";

const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, month, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");
  const [activeButton, setActiveButton] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "30d":
        return month;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              fill: false,
              data: determineTimeFormat(),
              backgroundColor: "rgba(15, 174, 150, 1)",
              borderColor: "rgba(15, 174, 150, 1)",
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
    }
  });

  const handleButtonClick = (timeFormat) => {
    setTimeFormat(timeFormat);
    setActiveButton(timeFormat);
  };

  const renderPrice = () => {
    if (detail) {
      return (
        <div className="d-flex align-items-center mb-3">
        <img className="coinlist-image" src={detail.image} alt="" />
        <div className="ml-3">
          <p className="my-0">${detail.current_price.toFixed(2)}</p>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          >
            {detail.price_change_percentage_24h.toFixed(1)}%
          </p>
        </div>
      </div>
      );
    }
  };
  return (
    <div className="bg-white border mt-2 rounded p-3">
      <div>{renderPrice()}</div>
      <div className="chart-button mt-1">
        <button
          onClick={() => handleButtonClick("24h")}
          className={
            activeButton === "24h"
              ? "btn btn-outline-secondary btn-sm active mx-1"
              : "btn btn-outline-secondary btn-sm mx-1"
          }
        >
          24h
        </button>
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
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>
    </div>
  );
};

export default HistoryChart;
