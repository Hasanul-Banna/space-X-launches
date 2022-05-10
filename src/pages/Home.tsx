import React, { FC, useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/_home.scss";

const Home: FC = () => {
  const [AllData, setAllData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const { flightData, isLoading } = useSelector((store: any) => store.flight);

  useEffect(() => {
    // console.log(flightData);
    setFilteredData(flightData);
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
          <Col md="3">
            <Form.Control
              autoFocus
              type="text"
              placeholder="Search By Rocket Name"
              className="rounded"
            />
          </Col>
          <Col md="3">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => console.log(e.target.value)}
            >
              <option>Search By Launch Date</option>
              <option value="7">Last Week</option>
              <option value="30">Last Month</option>
              <option value="365">Last Year</option>
            </Form.Select>
          </Col>
          <Col md="3">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Select aria-label="Default select example">
              <option>Search By Launch Status</option>
              <option value={1}>Success</option>
              <option value={0}>Failure</option>
            </Form.Select>
          </Col>
          <Col md="3" className="pt-2">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Check
              type={"checkbox"}
              id="checkbox123"
              onChange={(e) => console.log(e.target.checked)}
              label="Is Upcoming?"
            />
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
