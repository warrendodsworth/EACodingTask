const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'http://eacodingtest.digital.energyaustralia.com.au/api/v1';

// GET /
router.get('/', (req, res) => {
  res.send('api works');
});

// GET /cars
router.get('/cars', (req, res) => {

  axios.get(`${API}/cars`)
    .then(carsRes => {
      res.status(200).json(carsRes.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;
