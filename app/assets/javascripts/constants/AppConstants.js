var keyMirror = require('keymirror');
// dont forget to change this when in production
var APIRoot = 'http://localhost:3000';

module.exports = {
  ActionTypes: keyMirror({
    // Items
    REQUEST_ALL_ITEMS:       null,
    RECEIVE_ALL_ITEMS:       null,
  })
};
