var keyMirror = require('keymirror');
// dont forget to change this when in production
var APIRoot = 'http://localhost:3000';

module.exports = {
  ActionTypes: keyMirror({
    // Session
    SIGNUP_REQUEST:     null,
    LOGIN_REQUEST:      null,
    LOGIN_RESPONSE:     null,
    LOGOUT:             null,
    REQUEST_USER_INFO:  null,
    RECEIVE_USER_INFO:  null,
    // Items
    REQUEST_ALL_ITEMS:       null,
    RECEIVE_ALL_ITEMS:       null,
  })
};
