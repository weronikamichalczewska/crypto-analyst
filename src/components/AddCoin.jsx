import React, { useState, useContext } from "react";
import { WatchListContext } from "../context/watchListContext";
import "../App.css";

const AddCoin = () => {
  const [isActive, setIsActive] = useState(false);
  const { addCoin } = useContext(WatchListContext);
  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "cardano",
    "uniswap",
    "solana",
    "litecoin",
    "avalanche-2",
  ];

  const handleClick = (coin) => {
    addCoin(coin);
    setIsActive(false);
  };

  return (
    <div className="dropdown">
      <button
        onClick={() => setIsActive(!isActive)}
        className="btn btn-primary custom-btn dropdown-toggle"
        type="button"
      >
        Add Coin
      </button>
      <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
        {availableCoins.map((el) => {
          return (
            <a
              onClick={() => handleClick(el)}
              href="#"
              className="dropdown-item custom-dropdown-item" 
            >
              {el}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default AddCoin;
