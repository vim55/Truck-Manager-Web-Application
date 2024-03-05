// api.js connects to backend
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const api = axios.create({
    baseURL: baseURL
});

// code design adapted from assignment2
// get all trucks data as json
export const getTrucks = async () => {
    try {
        const response = await api.get('/trucks');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while retrieving trucks');
    }
};

// add a new truck
export const addTruck = async (truckData) => {
    try {
        const response = await api.post('/trucks', truckData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding a truck');
    }
};

// delete a truck
export const deleteTruck = async (registration) => {
    try {
        const response = await api.delete(`/trucks/${registration}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting the truck');
    }
};

// Edit a truck by increase dep time by 5min
export const increaseDepartureTime = async (registration) => {
    try {
        const response = await api.put(`/trucks/${registration}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while increasing the departure time');
    }
};