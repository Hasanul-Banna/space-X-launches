import React, { FC, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

type FilterBarProps = {
  resetData: () => void;
  handleFiltering: (value: any) => void;
};

const FilterBar: FC<FilterBarProps> = ({ resetData, handleFiltering }) => {
  const [SearchValues, setSearchValues] = useState({
    rocketName: "",
    status: 0,
    upcoming: false,
    dateRange: "10000000",
  });

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    if (field === "upcoming") {
      setSearchValues({
        ...SearchValues,
        [field]: event.target.checked,
      });
    } else {
      setSearchValues({
        ...SearchValues,
        [field]: value,
      });
    }
  };

  useEffect(() => {
    handleFiltering(SearchValues);
  }, [SearchValues]);

  const handleChange = (name: string, value: string | boolean) => {
    setSearchValues({ ...SearchValues, [name]: value });
  };

  return (
    <section className="container">
      <Row
        className="border p-3 rounded bg-white"
        style={{ marginTop: "-70px" }}
      >
        <Col md="4">
          <Form.Control
            autoFocus
            type="text"
            value={SearchValues.rocketName}
            onChange={handleInput("rocketName")}
            placeholder="Search By Rocket Name"
            className="rounded"
          />
        </Col>
        <Col md="2">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput("dateRange")}
          >
            <option value="10000000">Date Range (All)</option>
            <option value="7">Last Week</option>
            <option value="30">Last Month</option>
            <option value="365">Last Year</option>
          </Form.Select>
        </Col>
        <Col md="2">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput("status")}
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
            checked={SearchValues.upcoming}
            onChange={handleInput("upcoming")}
            label="Is Upcoming?"
          />
        </Col>
        <Col md="2" className="pt-1 text-center">
          <Button
            variant="primary"
            size="sm"
            className="px-3"
            onClick={() => resetData}
          >
            clear all filters
          </Button>
        </Col>
      </Row>
    </section>
  );
};

export default FilterBar;
