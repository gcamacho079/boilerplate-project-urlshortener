const { connect } = require('mongoose');
const { config } = require('dotenv');

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
}

module.exports = () => {
  config();
  const uri = process.env.DB_URI;

  connect(uri, connectOptions)
  .then((db) => {
    console.log('Connection estabislished with MongoDB');
  })
  .catch(error => console.error(error.message));
}
