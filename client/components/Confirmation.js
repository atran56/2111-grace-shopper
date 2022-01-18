import React from "react";

export default function Confirmation() {
  const number = Math.floor(Math.random() * 10000000000);
  return (
    <div>
      <div
        className="container d-flex w-100 h-100 p-3 mx-auto flex-column"
        style={{ margin: "20px" }}
      >
        <main className="px-3">
          <h1>Thank You For Your Order!</h1>
          <p className="lead">Your order number is {number}</p>
          <p className="lead">
            <a
              href="#"
              className="btn btn-lg btn-secondary fw-bold border-white bg-white"
            >
              Learn more
            </a>
          </p>
        </main>
      </div>
    </div>
  );
}
