const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {


    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async Store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        
        if (!dev) {
            const resposta = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = resposta.data;
            const techsArray = ParseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }

        return response.json(dev);
    }
}