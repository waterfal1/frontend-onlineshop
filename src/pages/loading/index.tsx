import React from "react";
import "./styles.css";

function Loading() {
  const arr = new Array(12).fill(0); // Create an array of length 8
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
