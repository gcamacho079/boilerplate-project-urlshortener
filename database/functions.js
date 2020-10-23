var mongo = require('mongodb');
var mongoose = require('mongoose');

const schema = new mongoose.Schema({ url: 'string'});
const Link = mongoose.model('Link', schema);

/* Counter */
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
});

const Counter = mongoose.model('Counter', counterSchema);

exports.initializeCounter = () => {
  Counter.findOne({ _id: 'url_id' }, (err, docs) => {
    if (err) console.log(err);
    
    if (docs) {
      return true;
    }

    return false;
  })
  .then((exists) => {
    if (!exists) {
      const newCounter = new Counter({
        _id: 'url_id',
        seq: 0,
      });
    
      newCounter.save((err, data) => {
        if (err) console.log(err);
        return data;
      });
    }
  });
};

/* Links */
exports.addNewUrl = (url) => {
  const newUrl = new Link({ url: url });

  newUrl.save((err, data) => {
    if (err) console.log(err);
    return data;
  });
};
