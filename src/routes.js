const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.post('/devs', async (request, response) => {

    const { github_username, techs } = request.body;
    const resposta = await axios.get(`https://api.github.com/users/${github_username}`);
    const { name = login, avatar_url, bio } = resposta.data;
    const techsArray = techs.split(',').map(tech => tech.trim());
    const DevRetorno = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray
    });
    return response.json(DevRetorno);
});


module.exports = routes;