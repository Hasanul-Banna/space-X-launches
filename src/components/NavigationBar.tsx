import React, { FC } from "react";
import SpaceXlogo from "../logo";

const NavigationBar: FC = () => (
  <div className="fixed-top w-100 p-3">
    <div style={{ width: "200px" }}>
      <SpaceXlogo />
    </div>
  </div>
);

export default NavigationBar;
