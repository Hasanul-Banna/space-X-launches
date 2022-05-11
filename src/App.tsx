/* eslint-disable */
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.scss";
import Layout from "./Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PreLoader from "./PreLoader";
import { setIsLoading, setLaunches } from "./store/slices/flightSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        dispatch(setLaunches(response.data));
        // console.log(response.data.reverse());
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  }, []);
  const [perLoader, setLoader] = useState(true);
  useEffect(() => {
    const handleLoading = () => {
      console.log("loaded");
      setTimeout(() => {
        setLoader(false);
      }, 3000);
    };
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, []);
  return (
    <Fragment>
      {perLoader ? (
        <PreLoader />
      ) : (
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/Home" />
              </Route>
              <Route path="/Home" exact>
                <Home />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Layout>
        </Router>
      )}
    </Fragment>
  );
}

export default App;
