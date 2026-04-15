import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { closeSellWindow, refreshHoldings } = useContext(GeneralContext);

  const handleSellClick = async () => {
    setError("");
    setLoading(true);

    const qty = parseInt(stockQuantity);
    const price = parseFloat(stockPrice);

    if (isNaN(qty) || qty <= 0) {
      setError("Please enter a valid quantity");
      setLoading(false);
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:3002/sellOrder", {
        name: uid,
        qty: qty,
        price: price,
        mode: "SELL",
      });

      alert(`✓ Stock sold!\\n${uid} x ${qty} @ ₹${price}`);
      setStockQuantity(1);
      setStockPrice("");
      
      // Trigger a refresh of Holdings data
      refreshHoldings();
      
      closeSellWindow();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to place order";
      setError(errorMsg);
      console.error("Sell error:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Sell price ₹{stockPrice || "0"}</span>
        {error && <div style={{ color: "red", marginBottom: "10px", fontSize: "12px" }}>⚠ {error}</div>}
        <div>
          <Link className="btn btn-blue" onClick={handleSellClick} style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Processing..." : "Sell"}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
