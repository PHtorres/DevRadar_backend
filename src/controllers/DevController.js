const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async Store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        //let dev = await Dev.findOne({ github_username });
        let dev = false;

        if (!dev) {
            const resposta = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = resposta.data;
            const techsArray = techs.split(',').map(tech => tech.trim());
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
            const DevRetorno = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }

        return response.json(DevRetorno);
    }
}