import React, { FC } from "react";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

const Layout: FC<{ children: any }> = ({ children }) => (
  <>
    <NavigationBar />
    {children}
    <Footer />
  </>
);

export default Layout;
