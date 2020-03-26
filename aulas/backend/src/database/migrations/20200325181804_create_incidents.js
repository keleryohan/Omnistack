exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        //declarando que o campo 'ong_id'(abaixo) é uma chave estrangeira
        //... do campo 'id' da tabela 'ongs'
        table.foreign('ong_id').references('id').inTable('ongs');

        //armazena o id da ong responsável
        table.string('ong_id').notNullable();

        
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('indicents');
};

//OBS: endereço das migrações e do banco definido no knexfile.js
/*COMANDOS RELATIVOS A MIGRAÇÃO:
npx knex migrate:make migration_name (cria um arquivo de migração como este)
npx knex migrate:latest (ativa a migração, tipo o migrate do django)
npx knex (lista todos os comandos)
npx knex rollback (desfaz a última migration)
npx knex status 
*/