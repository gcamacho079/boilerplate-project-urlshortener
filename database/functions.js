const { Mongoose } = require("mongoose");

var mongo = require('mongodb');
var mongoose = require('mongoose');

const schema = new mongoose.Schema({ url: 'string'});
const Link = mongoose.model('Link', schema);

exports.addNewUrl = (url) => {
  const newUrl = new Link({ url: url });

  newUrl.save((err, data) => {
    if (err) console.log(err);
    return data;
  });
};
