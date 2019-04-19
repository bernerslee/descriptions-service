// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '54.183.88.92',
      user : 'postgres',
      password : 'huy',
      database : 'sdc'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : '54.183.88.92',
      user : 'postgres',
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
  },

  production: {
    client: 'postgresql',
    connection: {
      host : '54.241.167.149',
      user : 'postgres',
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

