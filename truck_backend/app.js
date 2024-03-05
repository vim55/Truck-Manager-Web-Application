const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('@hapi/joi');
const cors = require('cors');

const app = express();

const port = 3001

// enanble Cross-Origin Resource Sharing
app.use(cors());

// middleware to translate json and xurl
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// let var so it can be changed with 'fake' updates to the data
// Assume each reg only has one unique entry
let truckData = [
    {
        "registration": "1ABC123",
        "arrivalTime": "2023-06-10T22:42:00.000Z",
        "departureTime": "2023-07-10T23:37:00.000Z",
        "bay": "1"
    },
    {
        "registration": "2ABC123",
        "arrivalTime": "2023-06-10T22:42:00.000Z",
        "departureTime": "2023-08-10T22:47:00.000Z",
        "bay": "12"
    },
    {
        "registration": "3ABC123",
        "arrivalTime": "2023-06-10T22:42:00.000Z",
        "departureTime": "2023-09-10T22:52:00.000Z",
        "bay": "12"
    },
    {
        "registration": "4ABC123",
        "arrivalTime": "2023-06-10T22:42:00.000Z",
        "departureTime": "2023-10-10T23:02:00.000Z",
        "bay": "12"
    },
    {
        "registration": "5ABC123",
        "arrivalTime": "2023-06-10T22:42:00.000Z",
        "departureTime": "2023-11-10T23:07:00.000Z",
        "bay": "1"
    }
];

// validate truck data using Joi: https://joi.dev/api/?v=17.9.1
// assume there are only bay 1 and 12, if there are more bays you can just add it into the valid()
// validation for bay 1 or 12 only: https://stackoverflow.com/questions/49007865/allow-only-specific-values-for-key-in-joi-schema
const validateTruck = (truck) => {
    const schema = Joi.object({
        registration: Joi.string().length(7).required(),
        arrivalTime: Joi.date().required(),
        departureTime: Joi.date().required(),
        bay: Joi.string().valid('1', '12').required(),
    });
    return schema.validate(truck);
};

// some of these codes are adapted from my assignement2.
// get all trucks
app.get('/trucks', (req, res) => {
    // no need for validation since it simply returns the truckData array
    res.json(truckData);
});

// add a new truck
app.post('/trucks', (req, res) => {
    // validate the param using JOI
    const { error } = validateTruck(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // get request body output
    const { registration, arrivalTime, departureTime, bay } = req.body;

    // Check if the registration already exists; Assume each reg only has one unique entry
    const existingTruck = truckData.find((truck) => truck.registration === registration);
    if (existingTruck) {
        return res.status(400).json({ error: 'Registration already exists' });
    }
    // create new truck and append to the truckData array
    const newTruck = {
        registration: registration.toUpperCase(),
        arrivalTime: new Date(arrivalTime).toISOString(),
        departureTime: new Date(departureTime).toISOString(),
        bay,
    };
    truckData.push(newTruck);
    res.json(truckData);
});

// delete a truck by registration number
app.delete('/trucks/:registration', (req, res) => {
    const { registration } = req.params;

    // validate the registration parameter
    const schema = Joi.string().required();
    const { error } = schema.validate(registration);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the truck with the specified registration exists
    const existingTruckIndex = truckData.findIndex((truck) => truck.registration === registration);
    if (existingTruckIndex === -1) {
        return res.status(404).json({ error: 'Truck not found' });
    }

    // Remove the truck from the truckData array
    truckData.splice(existingTruckIndex, 1);

    res.json(truckData);
});

// update a truck by increasing dep time by 5 min
app.put('/trucks/:registration', (req, res) => {
    const { registration } = req.params;
    const truckIndex = truckData.findIndex((truck) => truck.registration === registration);
    // if index exist
    if (truckIndex !== -1) {
        const currentDepartureTime = new Date(truckData[truckIndex].departureTime);
        const newDepartureTime = new Date(currentDepartureTime);
        // set minutes: https://www.w3schools.com/jsref/jsref_setminutes.asp
        newDepartureTime.setMinutes(currentDepartureTime.getMinutes() + 5);
        // update the dep time from the truck
        // convert time to an ISO 8601 date string (format is: YYYY-MM-DDTHH:mm:ss.sssZ) to be consistence across
        // https://www.w3schools.com/jsref/jsref_toisostring.asp
        truckData[truckIndex].departureTime = newDepartureTime.toISOString();

        res.json(truckData); 
    } else {
        res.status(404).json({ error: 'Truck not found' });
    }
});

app.listen(port, () => {
    console.log(`Truck backend app listening on port http://localhost:${port}`)
})