const request = require('request');
const yargs = require('yargs');

var geocode = (address, callback) => {
  var reqURI = encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`);
  request({
    url: reqURI,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Cannot connect ... ');
    } else {
      callback(undefined, {
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    };
  });
};

module.exports = {
  geocode
};
