import React from "react";
import loader from "./assets/Images/loader.gif";

const PreLoader = () => (
  <div
    className="w-100 d-flex flex-column justify-content-center align-items-center"
    style={{ height: "100vh", background: "#234f66" }}
  >
    <img
      src={loader}
      alt=""
      className="img-fluid"
      style={{ maxHeight: "60vh" }}
    />
  </div>
);

export default PreLoader;
