console.log('Starting');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./note.js');
const geocode = require('./weather.js');

const argv = yargs
  .command('add', 'Add new note', {
    title:{
      describe: 'Title of the note',
      demand: true,
      alias: 't'
    },
    body:{
      describe: 'Body of the note',
      demand: true,
      alias: 'b'
    }
  })
  .command('geocode', 'Geocode an address',{
    address:{
      describe: 'Enter any valid US address',
      demand: true,
      alias: 'a',
      string: true
    }
  })
  .help()
  .argv;
var cmd = process.argv[2];

if (cmd === 'add') {
  notes.add(argv.title, argv.body);
} else if (cmd === 'del') {
  notes.del(argv.title);
} else if (cmd === 'readNote') {
  var note = notes.readNote(argv.title);
  if (note) {
    console.log();
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log(`Cannot find note titled ${argv.title}`);
  }
} else if (cmd === 'geocode'){
  geocode.geocode(argv.address, (error, res) => {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(res, undefined, 2));
    }
  });
}
