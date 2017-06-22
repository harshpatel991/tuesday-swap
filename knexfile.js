module.exports = {
  development: {
      client: 'pg',
      connection: {
          host : 'localhost',
          user : 'postgres',
          password : 'postgres',
          database : 'todo'
      },
      pool: { min: 5, max: 20 }
  },

  production: {
      client: 'pg',
      connection: {
          host : process.env.DB_HOST,
          user : process.env.DB_USER,
          password : process.env.DB_PASSWORD,
          database : process.env.DB_DATABASE
      },
      pool: { min: 5, max: 20 }
  }

};
