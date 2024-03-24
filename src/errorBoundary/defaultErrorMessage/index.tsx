import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function DefaultErrorMessage() {
  return (
    <div className="container">
      <div className="row">
        <h1>Error</h1>
        <h2>UH OH! You're lost.</h2>
        <p>
          Something went wrong. Please, try later. But you can click the button
          below to go back to the homepage.
        </p>
        <Link to="/">
          <button className="btn green">HOME</button>
        </Link>
      </div>
    </div>
  );
}

export default DefaultErrorMessage;
