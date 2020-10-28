var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const schema = new mongoose.Schema({ 
  url: String,
  index: Number,
});
const Link = mongoose.model('Link', schema);

/* Counter */
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
});

// Record where counter is stored
const countFilter = { _id: 'url_id' };

const Counter = mongoose.model('Counter', counterSchema);

exports.initializeCounter = () => {
  Counter.findOne(countFilter, (err, docs) => {
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
  return new Promise((resolve, reject) => {
    Counter.findById('url_id')
    .then((data) => {
      return data.seq;
    })
    .then((count) => {
      const update = {
        seq: count + 1
      };

      const newUrl = new Link({ 
        index: count,
        url: url,
      });

      newUrl.save((err) => {
        if (err) console.log(err);
        const shortUrl = `/api/shorturl/${count}`;
        
        Counter.findOneAndUpdate(countFilter, update, (err) => {
          if (err) console.log(err);
          resolve(shortUrl);
        });
      });
    });
  });
};
