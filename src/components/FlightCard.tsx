import React from "react";
import { Badge, Button } from "react-bootstrap";

const FlightCard = (props) => {
  const { flight } = props;
  return (
    <div className="px-1 py-3">
      <div className="">
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
        <p>
          {flight.upcoming ? (
            <Badge bg="warning" className="text-black">
              Upcoming
            </Badge>
          ) : (
            ""
          )}
        </p>
        <p className="m-0 p-0 mt-1">
          {String(new Date(flight.launch_date_local)).slice(4, 15)}
        </p>
        <h2 className="display-5">{flight.mission_name}</h2>
        <p className="text-info"> &#128640; {flight.rocket.rocket_name}</p>
        <p>
          Launch Status :
          {flight.launch_success ? (
            <Badge pill bg="success" className="mx-3 px-2">
              Successful
            </Badge>
          ) : (
            <Badge pill bg="danger" className="mx-3 px-2">
              Failed
            </Badge>
          )}
        </p>
        <div className="w-100">
          <Button
            variant="outline-secondary"
            size="sm"
            className="text-white w-100"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
