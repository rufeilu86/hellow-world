console.log('Starting notes');
const fs = require('fs');

var fetchNote = () =>{
  return JSON.parse(fs.readFileSync('notes.json'));
}

var del = (fileName) => {
  var notes = fetchNote();
  var newNotes = notes.filter((notes) => notes.fileName !== fileName);
  fs.writeFileSync('notes.json', JSON.stringify(newNotes));
};

var add = (title, body) => {
  var notes = [];
  var note = {
    title,
    body
  };

  try {
    var notes = fetchNote();
  } catch (e) {
    console.log('No note found and first one created');
  }

  var duplicate = notes.filter((notes) => notes.title === title);
  if (duplicate.length === 0){
    notes.push(note);
    fs.writeFileSync('notes.json', JSON.stringify(notes));
  }

};

var readNote = (title) => {
  var notes = fetchNote();
  return notes.filter((notes) => notes.title === title)[0];
};

module.exports = {
  del,
  add,
  readNote
};
