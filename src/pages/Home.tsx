/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import { Badge, Col, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../assets/styles/_home.scss";
import FilterBar from "../components/FilterBar";

const Home: FC = () => {
  const { flightData, isLoading } = useSelector((store: any) => store.flight);

  const [FilteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(flightData);
  }, [flightData]);

  const getDateDifference = (date) => {
    const date1: any = new Date();
    const date2: any = new Date(date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays + " days");
    return diffDays;
  };

  const resetData = () => {
    setFilteredData(flightData);
  };

  const handleFiltering = (value) => {
    const { rocketName, status, upcoming, dateRange } = value;
    const data = flightData.filter((flight) => {
      if (
        handleRocketNameSearch(rocketName, flight) &&
        handleStatus(status, flight) &&
        handleUpcoming(upcoming, flight) &&
        handleDateRange(dateRange, flight)
      ) {
        return flight;
      }
    });

    setFilteredData(data);
  };

  const handleRocketNameSearch = (name: string, item) => {
    return item.rocket.rocket_name.toLowerCase().includes(name.toLowerCase());
  };

  const handleDateRange = (dateRange: string, item) => {
    return getDateDifference(item.launch_date_local) <= Number(dateRange);
  };

  const handleStatus = (status: number, item) => {
    if (status == 1) {
      return item.launch_success;
    } else if (status == 2) {
      return !item.launch_success;
    } else {
      return item;
    }
  };

  const handleUpcoming = (upcoming: boolean, item) => {
    return item.upcoming === upcoming;
  };

  return (
    <div>
      <section className="banner text-center  d-flex flex-column justify-content-center align-items-center ">
        <h2 className="display-3 text-white">L a u n c h e s</h2>
      </section>
      <FilterBar resetData={resetData} handleFiltering={handleFiltering} />
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
