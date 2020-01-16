const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');

module.exports = {

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            let { name = login, avatar_url, bio } = apiResponse.data
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

        }
        return res.json(dev)
    },
    async index(req,res){
        const devs = await Dev.find();
        return res.json(devs)
    },
    async delete(req, res) {
        const { github_username } = req.body;
        const dev = await Dev.deleteOne({github_username});
        if(dev)
            return res.json({delete: true});
    },
    async update(req, res) {
    }

}