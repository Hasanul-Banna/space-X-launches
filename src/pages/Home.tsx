/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../assets/styles/_home.scss";

const Home: FC = () => {
  const [SearchValues, setSearchValues] = useState({
    name: "",
    dateRange: "all",
    status: "all",
    isUpcoming: false,
  });
  const [FilteredData, setFilteredData] = useState([]);
  const [AllData, setAllData] = useState([]);
  const { flightData, isLoading } = useSelector((store: any) => store.flight);
  const handleChange = (name: string, value: string | boolean) => {
    setSearchValues({ ...SearchValues, [name]: value });
  };
  const handleUpcomingFilter = (value) => {
    let updatedData = [];
    if (FilteredData.length) {
      updatedData = FilteredData.filter((item) => item.upcoming === value);
    } else {
      updatedData = AllData.filter((item) => item.upcoming === value);
    }
    setFilteredData(updatedData);
  };
  const handleFilter = (e, list) => {
    const value = e.target.value;
    let updatedData = [];

    if (value.length) {
      updatedData = list.filter((item) => {
        const startsWith =
          item.mission_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.rocket.rocket_name.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.mission_name.toLowerCase().includes(value.toLowerCase()) ||
          item.rocket.rocket_name.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
    }
  };
  useEffect(() => {
    // console.log(flightData);
    setFilteredData(flightData);
    setAllData(flightData);
  }, [flightData]);
  return (
    <div>
      <section className="banner text-center  d-flex flex-column justify-content-center align-items-center ">
        <h2 className="display-4 text-white">Launches</h2>
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
                handleFilter(e, AllData);
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
                console.log(e.target.value);
              }}
            >
              <option value={"all"}>Date Range (All)</option>
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
                console.log(e.target.value);
              }}
            >
              <option value={"all"}>Status (All)</option>
              <option value={1}>Success</option>
              <option value={0}>Failure</option>
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
                handleUpcomingFilter(e.target.checked);
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
              Reset to Default
            </Button>
          </Col>
        </Row>
      </section>
      <section className="container">
        <Row>
          {!isLoading ? (
            FilteredData.map((flight: any, index) => (
              <Col key={index} lg="3" md="4" sm="6">
                <div className="p-1">
                  <div
                    className="border drop-shadow text-center"
                    style={{ height: "150px" }}
                  >
                    <img
                      src={
                        flight.links.flickr_images.length
                          ? flight.links.flickr_images[0]
                          : flight.links.mission_patch
                      }
                      alt="Image Not Found!"
                      className="img-fluid"
                      style={{ height: "150px" }}
                    />
                  </div>
                  <p>{flight.mission_name}</p>
                  <p>{flight.rocket.rocket_name}</p>
                  <p>
                    {String(new Date(flight.launch_date_local)).slice(4, 15)}
                  </p>
                  <p>{flight.launch_success ? "Success" : "Failed"}</p>
                  <p>{flight.upcoming ? "Upcoming" : "Not Upcoming"}</p>
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
  );
};

export default Home;
