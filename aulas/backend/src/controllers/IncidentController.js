const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        //lembrando que paramm query (link/?page=N)
        //se o parâmetro page n existir, padrão = 1
        const {page = 1} = request.query;

        //total de incidents (retorna um dicionário, [count] pega o 
        //primeiro par)
        const [count] = await connection('incidents').count()

        //console.log(count);

        //limit(5) restringe a busca a 5 elementos
        //offset(x) pula os x primeiro elementos 
        //join = (tabela de ongs, id da ong seja igual ao ong_id
        //daquele incident)
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id','=','incidents.ong_id')
        .limit(5).offset((page - 1)*5)
        .select('incidents.*','ongs.name','ongs.email',
        'ongs.whatsapp','ongs.city','ongs.uf');

        //colocando o total de itens no header da resposta
        //lembrando que count é um dicionário, e a chave (console.log(count))
        //é aquela 
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        //pegando a primeira variável do array, que é o id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id });
    },

    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        //seleciona entre os incidents, aquele com aquele id, e pega apenas..
        //.. a tabela 'ong_id'
        const incident = await connection('incidents')
        .where('id',id).select('ong_id').first();

        if(incident.ong_id != ong_id ){
            //status 401 -> unauthorized
            return response.status(401).json({error: 'Operation not permited'});
        }
        
        await connection('incidents').where('id',id).delete();

        //status 204 -> resposta deu sucesso mas n retorna nada
        return response.status(204).send();
    }
}