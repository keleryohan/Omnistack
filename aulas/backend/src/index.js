const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333);
//por algum motivo o nodemon parou de funcionar

//instalados manualmente:
//chocolatey (gerenciador de pacotes)
//nodejs-lts (lts = versão estável)(usando choco)
//express
//nodemon(recarrega server automaticamente após mudança no código)
//knex (query builder)(lida com banco de dados)
//sqlite3

/*
para inicializar server: 
node index.js
ou, usado o nodemon: nodemon index.js
(ou ainda utilizando o script start que definimos): npm start (que faz o acima)
*/
/*
request: requisição do site ao back
response: resposta do back ao site
*/

/*MÉTODOS HTTP
GET: buscar/listar uma informação do back-end(site pega do back)
POST: criar uma informação no back-end (site envia ao back)
PUT: alterar uma informação no back-end
DELETE: deleta uma informação no back-end
*/

/* TIPOS DE PARÂMETRO
-query params: parâmetros enviados na rota após o "?". 
filtra dados vindos do back
ex¹: /users?nome=keler&idade=20

-route params: parâmetros usados para identificar recursos (objetos específicos)
ex²: (no link) /users/1 (no back) users/:id

-body params: parâmetros enviados do site ao back em formato JSON
*/

/* COMO ACESSAR VARIÁVEIS
request.query
ex¹: request.query = {nome:"keler",idade:20}

request.params
ex²: request.params = {id:1}

request.body

request.headers - informações sobre quem está fazendo a requisição
*/