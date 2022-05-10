import { Button, Col, Form, Row } from "react-bootstrap";

const FilterForm = (props) => {
  const { SearchValues, handleChange, setFilteredData, flightData } = props;
  return (
    <Row className="border p-3 rounded bg-white" style={{ marginTop: "-80px" }}>
      <Col lg="4">
        <Form.Control
          autoFocus
          type="text"
          value={SearchValues.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
            // handleFilter(e, AllData);
          }}
          placeholder="Search By Mission/Rocket Name"
          className="rounded"
        />
      </Col>
      <Col lg="2">
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
      <Col lg="2">
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
      <Col lg="2" className="pt-2">
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
      <Col lg="2" className="pt-1 text-center">
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
  );
};

export default FilterForm;
