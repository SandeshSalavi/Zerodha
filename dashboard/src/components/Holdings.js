import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { refreshTrigger, openSellWindow } = useContext(GeneralContext);

  const fetchHoldings = () => {
    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => {
        console.log("Holdings updated:", res.data);
        setAllHoldings(res.data || []);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setAllHoldings([]);
      });
  };

  useEffect(() => {
    fetchHoldings();
  }, [refreshTrigger]);

  // Labels for graph
  const labels = allHoldings.map((stock) => stock.name || "N/A");

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              // ✅ Safe values
              const name = stock.name || "N/A";
              const qty = stock.qty || 0;
              const avg = stock.avg || 0;
              const price = stock.price || 0;

              const curValue = price * qty;
              const pnl = curValue - avg * qty;

              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pnl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net || "0%"}</td>
                  <td className={dayClass}>{stock.day || "0%"}</td>
                  <td>
                    <button 
                      onClick={() => openSellWindow(name)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ff6b6b",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      {/* Graph */}
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;