import React from "react";
import { NavLink } from "react-router-dom";

import "./styles.css";

function DefaultErrorMessage() {
  return (
    <div className="container">
      <div className="row">
        <h1>Error</h1>
        <h2>UH OH! You{"\u0027"}re lost.</h2>
        <p>
          Something went wrong. Please, try later. But you can click the button
          below to go back to the homepage.
        </p>
        <NavLink to="/">
          <button className="btn green">HOME</button>
        </NavLink>
      </div>
    </div>
  );
}

export default DefaultErrorMessage;
