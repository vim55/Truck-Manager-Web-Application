import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";

class TruckForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registration: "",
      arrivalTime: "",
      departureTime: "",
      bay: "",
      registrationExists: false, // used for alert is reg already exist 
    };
  }

  // sync input box changes and set registrationExists state to false
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, registrationExists: false });
  };

  // submit form with truck data
  handleSubmit = (event) => {
    event.preventDefault();
    const { registration, arrivalTime, departureTime, bay } = this.state;

    // Check if registration already exists
    const existingTruck = this.props.allTrucks.find((truck) => truck.registration === registration);
    if (existingTruck) {
      this.setState({ registrationExists: true });
      return;
    }

    // if registeration does not exist then add trucks using parent onAddTruck method
    this.props.onAddTruck({
      registration,
      arrivalTime,
      departureTime,
      bay,
    });

    // clear input once added
    this.setState({
      registration: "",
      arrivalTime: "",
      departureTime: "",
      bay: "",
    });
  };

  //using form select: https://react-bootstrap.netlify.app/docs/forms/select
  //using html datetime input: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
  render() {
    const { registration, arrivalTime, departureTime, bay, registrationExists, } = this.state;
    
    // generate alert if the registeration is already exist
    let alertRegistrationExists = null
    if (registrationExists) 
    {
      alertRegistrationExists = <Alert variant="danger">Registration already exists</Alert>;
    }
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Label>Registration (Must be length of 7)</Form.Label>
        <Form.Control
          type="text"
          name="registration"
          placeholder="Enter Registration"
          value={registration}
          onChange={this.handleInputChange}
          isInvalid={registrationExists}
        />
        {alertRegistrationExists}

        <Form.Label>Arrival Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="arrivalTime"
          placeholder="Enter Arrival Time"
          value={arrivalTime}
          onChange={this.handleInputChange}
        />


        <Form.Label>Departure Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="departureTime"
          placeholder="Enter Departure Time"
          value={departureTime}
          onChange={this.handleInputChange}
        />

        <Form.Label>Bay</Form.Label>
        <Form.Select
          name="bay"
          value={bay}
          onChange={this.handleInputChange}
        >
          <option value="">Select Bay</option>
          <option value="1">1</option>
          <option value="12">12</option>
        </Form.Select>
        <br />
        <Button variant="primary" type="submit">
          Add Truck
        </Button>
      </Form>
    );
  }
}

export default TruckForm;
