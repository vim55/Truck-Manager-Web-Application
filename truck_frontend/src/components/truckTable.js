import React from "react";

import { Container, Table, Button } from "react-bootstrap";

function TruckTable( props ) {
  return (
    <Container className='mt-3'>
    {/* Only render the table when there is truck data */}
    {props.allTrucks.length > 0 ? (
      <Table>
      <thead>
        <tr>
          <th>Registration</th>
          <th>Arrival Time</th>
          <th>Departure Time</th>
          <th>Bay</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.allTrucks.map((truck) => (
          <tr key={truck.registration}>
            <td>{truck.registration}</td>
            <td>{truck.arrivalTime}</td>
            <td>{truck.departureTime}</td>
            <td>{truck.bay}</td>
            <td>
              <Button variant="danger" onClick={() => props.onDeleteTruck(truck.registration)}>Delete</Button>
              <Button variant="primary" onClick={() => props.onIncreaseDepartureTime(truck.registration)}>+5min Departure Time</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    ) : (
      <p> No trucks found. </p>
    )}
    </Container>
  );
};

export default TruckTable;
