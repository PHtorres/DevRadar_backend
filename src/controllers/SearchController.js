const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {

    async index(request, response){
        const {latitude, longitude, techs} = request.query;
        const techsArray = ParseStringAsArray(techs);
        console.log(techsArray);
    }
}