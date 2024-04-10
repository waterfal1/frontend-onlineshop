import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function NotFoundPage() {
  return (
    <div className="notFound">
      <div>
        <h1>404</h1>
        <h2>UH OH! Look You{"\u0027"}re lost.</h2>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <Link to="/">
          <button className="btn green">HOME</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
