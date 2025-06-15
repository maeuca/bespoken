import React from "react";

import { RingLoader } from "react-spinners";

export const Loader: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <RingLoader color="#000" />
    </div>
  );
};