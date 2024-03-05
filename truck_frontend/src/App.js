import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import TruckTable from './components/truckTable';
import TruckForm from './components/truckForm';


import { getTrucks, addTruck, deleteTruck, increaseDepartureTime } from './components/api';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trucks: [],
    };
  }

  // initialise the truck data
  componentDidMount() {
    this.fetchTrucks();
  }

  // call getTruck api to get all trucks
  fetchTrucks = async () => {
    try {
      const trucks = await getTrucks();
      // set truck state to re-render
      this.setState({ trucks: trucks });
    } catch (error) {
      console.error('Error fetching trucks:', error);
    }
  };

  // call addTruck api to add a new trucks
  handleAddTruck = async (truckData) => {
    try {
      const trucks = await addTruck(truckData);
      // set truck state to re-render
      this.setState({ trucks: trucks });
    } catch (error) {
      console.error('Error adding truck:', error);
    }
  };

  // call deleteTruck api to delete a trucks using reg
  handleDeleteTruck = async (registration) => {
    try {
      const trucks = await deleteTruck(registration);
      // set state state to re-render
      this.setState({ trucks: trucks });
    } catch (error) {
      console.error('Error deleting truck:', error);
    }
  };

  // call increaseDepartureTime api to edit a trucks, increase 5min dep time
  handleIncreaseDepartureTime = async (registration) => {
    try {
      const trucks = await increaseDepartureTime(registration);
      // set state to state re-render
      this.setState({ trucks: trucks });
    } catch (error) {
      console.error('Error increasing departure time:', error);
    }
  };

  render() {
    return (
      <Container>
        <h1>Dynamite Transport - Truck Manager</h1>
        <h5>Adding a truck</h5>
        <Row>
          <Col md={4}>
            <TruckForm allTrucks={this.state.trucks} onAddTruck={this.handleAddTruck} />
          </Col>
        </Row>
        <br />
        <h5>List of All Trucks</h5>
        <Row>
          <TruckTable
            allTrucks={this.state.trucks}
            onDeleteTruck={this.handleDeleteTruck}
            onIncreaseDepartureTime={this.handleIncreaseDepartureTime}
          />
        </Row>
      </Container>
    );
  }
}

export default App;
