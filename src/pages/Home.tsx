/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import { Badge, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../assets/styles/_home.scss";

const Home: FC = () => {
  const [SearchValues, setSearchValues] = useState({
    name: "",
    status: "0",
    isUpcoming: null,
    dateRange: "0",
  });
  const getDateDifference = (date) => {
    const date1: any = new Date();
    const date2: any = new Date(date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays + " days");
    return diffDays;
  };
  const { flightData, isLoading } = useSelector((store: any) => store.flight);
  useEffect(() => {
    setFilteredData(flightData);
  }, [flightData]);
  const [FilteredData, setFilteredData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const handleChange = (name: string, value: string | boolean) => {
    setSearchValues({ ...SearchValues, [name]: value });
  };
  useEffect(() => {
    // console.log(SearchValues);
    let AllData = [...flightData];
    let updatedData = [];
    if (SearchValues.isUpcoming !== null) {
      console.log("isUpcoming");
      updatedData = AllData.filter(
        (item) => item.upcoming === SearchValues.isUpcoming
      );
    }
    if (!!SearchValues.name.length) {
      console.log("rocket");
      updatedData = AllData.filter((item) => {
        return item.rocket.rocket_name
          .toLowerCase()
          .includes(SearchValues.name.toLowerCase());
      });
    }
    if (SearchValues.status !== "0") {
      console.log("launch_success");
      updatedData = AllData.filter(
        (item) => item.launch_success === (Number(SearchValues.status) === 1)
      );
    }
    if (SearchValues.dateRange !== "0") {
      console.log("dateRange");
      updatedData = AllData.filter(
        (item) =>
          getDateDifference(item.launch_date_local) <=
          Number(SearchValues.dateRange)
      );
    }
    setFilteredData(updatedData);
    console.log(updatedData.length);
  }, [SearchValues]);
  return (
    <div>
      <section className="banner text-center  d-flex flex-column justify-content-center align-items-center ">
        <h2 className="display-3 text-white">L a u n c h e s</h2>
      </section>
      {/* banner section ends */}
      <section className="container">
        <Row
          className="border p-3 rounded bg-white"
          style={{ marginTop: "-70px" }}
        >
          <Col md="4">
            <Form.Control
              autoFocus
              type="text"
              value={SearchValues.name}
              onChange={(e) => {
                handleChange("name", e.target.value);
                // handleFilter(e, AllData);
              }}
              placeholder="Search By Rocket Name"
              className="rounded"
            />
          </Col>
          <Col md="2">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleChange("dateRange", e.target.value);
                // console.log(e.target.value);
              }}
            >
              <option value={"0"}>Date Range (All)</option>
              <option value="7">Last Week</option>
              <option value="30">Last Month</option>
              <option value="365">Last Year</option>
            </Form.Select>
          </Col>
          <Col md="2">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleChange("status", e.target.value);
                // console.log(e.target.value);
              }}
            >
              <option value={0}>Status (All)</option>
              <option value={1}>Success</option>
              <option value={2}>Failure</option>
            </Form.Select>
          </Col>
          <Col md="2" className="pt-2">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Check
              type={"checkbox"}
              id="checkbox123"
              checked={SearchValues.isUpcoming}
              onChange={(e) => {
                handleChange("isUpcoming", e.target.checked);
                // handleUpcomingFilter(e.target.checked);
              }}
              label="Is Upcoming?"
            />
          </Col>
          <Col md="2" className="pt-1 text-center">
            <Button
              variant="primary"
              size="sm"
              className="px-3"
              onClick={() => setFilteredData(flightData)}
            >
              clear all filters
            </Button>
          </Col>
        </Row>
      </section>
      <div style={{ background: "black", minHeight: "30vh", color: "white" }}>
        <section className="container">
          <Row>
            {!isLoading ? (
              FilteredData.map((flight: any, index) => (
                <Col key={index} lg="4" md="4" sm="6">
                  <div className="px-1 py-3">
                    <div className=".customShadow">
                      <div className="text-center" style={{ height: "250px" }}>
                        <img
                          src={
                            flight.links.flickr_images.length
                              ? flight.links.flickr_images[0]
                              : flight.links.mission_patch
                          }
                          alt="Image Not Found!"
                          className="img-fluid"
                          style={{ height: "250px" }}
                        />
                      </div>
                      <p className="m-0 p-0 mt-1">
                        {String(new Date(flight.launch_date_local)).slice(
                          4,
                          15
                        )}
                      </p>
                      <h2 className="display-5">{flight.mission_name}</h2>
                      <p>Rocket : {flight.rocket.rocket_name}</p>
                      <p>
                        {flight.launch_success ? (
                          <Badge pill bg="success">
                            Successful
                          </Badge>
                        ) : (
                          <Badge pill bg="danger">
                            Failed
                          </Badge>
                        )}
                      </p>
                      <p>{flight.upcoming ? "Upcoming" : "Not Upcoming"}</p>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div className="text-center w-100 p-5">
                <Spinner animation="grow" variant="primary" />
              </div>
            )}
          </Row>
        </section>
      </div>
    </div>
  );
};

export default Home;
