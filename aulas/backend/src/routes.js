const express = require('express');

//const connection = require('./database/connection')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id',IncidentController.delete);

//mostra todos os incidents de determinada ong
routes.get('/profile',ProfileController.index);

//login,logout
routes.post('/sessions', SessionController.create);

module.exports = routes;