//o que a migração vai fazer
exports.up = function(knex) {
    return knex.schema.createTable('ongs',function(table){
        table.string('id').primary();//login
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
    });
};

//método down: deu um problema, volte atrás na migração
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};

//OBS: endereço das migrações e do banco definido no knexfile.js
/*COMANDOS RELATIVOS A MIGRAÇÃO:
npx knex migrate:make migration_name (cria um arquivo de migração como este)
npx knex migrate:latest (ativa a migração, tipo o migrate do django)
*/