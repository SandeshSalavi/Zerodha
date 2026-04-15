import React from "react";

function Hero() {
  return (
    <div className="container  ">
      <div className="row p-5 mt-5 border-bottom  text-center ">
        <h1>Pricing</h1>
        <p className="text-muted mt-4">
          {" "}
          Free equity investments and flat
          <i class="fa fa-inr" aria-hidden="true"></i> 20 traday and F&O trades
        </p>
      </div>
      <div className="row p-5 mt-5 ">
        <div className="col-4  p-4">
          <img src="media/images/pricingEquity.svg" />
          <h1 className="fs-3">Free equity delivery</h1>
          <p className="text-muted">
            All equity delivery investments(NSE,BSE) are absolutely free-
            <i class="fa fa-inr" aria-hidden="true"></i> 0 brokerage.{" "}
          </p>
        </div>
        <div className="col-4 p-4">
          <img src="media/images/intradayTrades.svg" />
          <h1 className="fs-3">Intraday and F&O trades</h1>
          <p className="text-muted">
           Flat Rs.20 or 0.03% (whichever is lower) per executed
           order on intraday trades across equity,currency,and commodity
           trades.
           
          </p>
        </div>
        <div className="col-4 p-4">
          <img src="media/images/pricingEquity.svg" />
          <h1 className="fs-3">Free direct MF</h1>
          <p className="text-muted">
            All equity delivery investments(NSE,BSE) are absolutely free-
            <i class="fa fa-inr" aria-hidden="true"></i> 0 brokerage.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
