const { Type } = require('../db');
const axios = require('axios')

const getTypeController = async () => {

    const typesDb = await Type.findAll();
    if (typesDb.length) {
        return typesDb;
    } else {
        const typesApi = await axios('https://pokeapi.co/api/v2/type');
        const data = Promise.all(typesApi.data.results.map(async (element, index) => {
            let types = await Type.create({
                id: ++index,
                name: element.name
            });
            return types;
        }));
        return data;
    }
}

module.exports = getTypeController;