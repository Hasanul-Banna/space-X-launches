/* eslint-disable */
import axios from "axios";
import React, { useEffect } from "react";
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
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/Home" />
          </Route>
          <Route path="/Home" exact>
            {/* <Suspense fallback={<Spinner animation="grow" variant="primary" />}> */}
            <Home />
            {/* </Suspense> */}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
