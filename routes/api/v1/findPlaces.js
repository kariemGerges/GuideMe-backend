require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const getPlaceAndType = async (textQuery) => {
    // const for api url and places 
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const url = `https://places.googleapis.com/v1/places:searchText`;

    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
        '*'
        // 'places.displayName'
        // 'places.displayName,places.formattedAddress,places.primaryType,places.types,places.evChargeOptions,places.nationalPhoneNumber,places.internationalPhoneNumber,places.rating,places.websiteUri,places.regularOpeningHours.openNow,places.regularOpeningHours.weekdayDescriptions,places.userRatingCount,places.reviews,places.photos,places.goodForChildren,places.allowsDogs,places.accessibilityOptions'
    };

    const data = {
        textQuery: textQuery,
        pageSize: 10
    };


    try {

        const response = await axios.post( url, data, { headers } );
        return response.data.places;

    } catch (error) {
        console.error('Error fetching places:', error);
        throw error;
    }

};

router.post('/', async (req, res) => {

    // an array of of all places in one destination
    const placesTypes = [
        'tourist_attraction',
        'lodging',
        'restaurant',
        'park',
        'museum',
        'ev_charger',
        'natural_feature'
    ];

    try {
        // destination is a query coming from the frontend user
        const { destination } = req.query; 

        const textQuery = placesTypes.map(type => `${type} in ${destination}`);

        const response = await Promise.all(textQuery.map(textQuery => getPlaceAndType(textQuery)));
        const results = response.flat();
        res.json(results);


    } catch (error) {
        res.status(500).send(`Error fetching places: ${error.message}`);
    }
});

module.exports = router;
