// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '172.17.0.2',
      // user : 'huy',
      // password : 'huy',
      database : 'sdc'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : '172.17.0.2',
      // user : 'huy',
      // password : 'huy',
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
      // host : '172.17.0.2',
      // user : 'huy',
      password : 'huy',
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

