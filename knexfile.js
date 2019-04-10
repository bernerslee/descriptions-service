// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'huy',
      password : '1',
      database : 'sdc'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : 'localhost',
      user : 'huy',
      password : '1',
      database : 'sdc'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host : 'localhost',
      user : 'huy',
      password : '1',
      database : 'sdc'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

