require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_Secret
  });
  
  router.post('/', async (req, res) => {
    try {
        const { originLocation, destinationLocation, depTravelDates, adultsNumber } = req.body;
  
      const response = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originLocation,
        destinationLocationCode: destinationLocation,
        departureDate: depTravelDates,
        adults: adultsNumber,
        max: 5
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching flight details', error);
      res.status(500).send('Error fetching flight details');
    }
  });

module.exports = router