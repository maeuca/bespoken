import React from "react";
import { FaBicycle } from "react-icons/fa";

export const Landing: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Bespoken</h1>
      <p>
        <FaBicycle size={120} style={{ marginBottom: "1rem" }} /> 
      </p>
    </div>
  );
};
