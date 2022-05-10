/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../assets/styles/_home.scss";
import FilterForm from "../components/FilterForm";
import FlightCard from "../components/FlightCard";

const Home: FC = () => {
  const { flightData, isLoading } = useSelector((store: any) => store.flight);
  const [FilteredData, setFilteredData] = useState([]);
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

  useEffect(() => {
    setFilteredData(flightData);
  }, [flightData]);

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

  const handleChange = (name: string, value: string | boolean) => {
    setSearchValues({ ...SearchValues, [name]: value });
  };
  return (
    <div>
      <section className="banner text-center  d-flex flex-column justify-content-center align-items-center ">
        <h2 className="display-3 text-white">L a u n c h e s</h2>
      </section>
      <Container>
        <FilterForm
          SearchValues={SearchValues}
          handleChange={handleChange}
          setFilteredData={setFilteredData}
          flightData={flightData}
        />
      </Container>

      <div style={{ background: "black", minHeight: "30vh", color: "white" }}>
        <Container>
          {!isLoading && (
            <h3 className="display-5 text-center py-3">
              Found : {FilteredData.length}
            </h3>
          )}
          <Row>
            {!isLoading ? (
              FilteredData.map((flight: any, index) => (
                <Col key={index} lg="4" md="4" sm="6">
                  <FlightCard flight={flight} />
                </Col>
              ))
            ) : (
              <div className="text-center w-100 p-5">
                <Spinner animation="grow" variant="primary" />
              </div>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
