const Sequelize = require('sequelize')

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  `postgres://oyrjuoyixdpabf:0230d835d1cd5d3eb5e22706fdd4ff4281659d879e9f3bcbecc2b68cf75ec371@ec2-52-22-81-147.compute-1.amazonaws.com:5432/d9vle7djmj0an2?sslmode=no-verify`, config)
module.exports = db
