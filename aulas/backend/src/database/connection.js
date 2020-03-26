//conecção com o banco de dados 

const knex = require('knex');
const configuration = require('../../knexfile')

//onde está o database e as migrations
const connection = knex(configuration.development);

module.exports = connection;