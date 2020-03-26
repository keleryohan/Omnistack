const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {
    //index = listar ongs
    async index (request,response) { 
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    //cria ongs
    async create(request,response){
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        //await: termina a função antes de prosseguir
        //cria uma tabela 'ongs' usando os parâmetros dados
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({id});
    }
}