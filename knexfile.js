// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'database',
      user : 'huy',
      password : '1',
      database : 'sdc',
      port: '5432'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : 'database',
      user : 'huy',
      password : '1',
      database : 'sdc',
      port: '5432'
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
      host : 'database',
      user : 'huy',
      password : '1',
      database : 'sdc',
      port: '5432'
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

