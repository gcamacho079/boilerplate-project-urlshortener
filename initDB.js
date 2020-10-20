const { connect, connection } = require('mongoose');
const { config } = require('dotenv'); 

module.exports = () => {
  config();
  const uri = process.env.DB_URI;

  connect(uri)
  .then(() => {
    console.log('Connection estabislished with MongoDB');
  })
  .catch(error => console.error(error.message));
}
