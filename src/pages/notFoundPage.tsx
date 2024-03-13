import React from "react";
import { Link } from "react-router-dom";

function Notfoundpage() {
  return (
    <div>
      This page doesn't exist. Go <Link to="/">home</Link>
    </div>
  );
}

export default Notfoundpage;
