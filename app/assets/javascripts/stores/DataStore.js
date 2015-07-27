var _ = require('underscore');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppRequest = require('../http/AppRequest');
var I = require('immutable');
var Store = require('./Store');
var Router = require('../Router.js');
var ActionTypes = AppConstants.ActionTypes;
var AppActions = require('../actions/AppActions');

// relative_url
function rUrl(url) {
  return _DataStore.get('baseUrl') + url;
}

var _DataStore = I.fromJS({
  allItems: [],
});

var DataStore = _.extend({
  init: function(config) {
    _DataStore = _DataStore.merge(config);
  },

  getStore: function() {
    return _DataStore;
  },

  requestAllItems: function(){
    AppRequest({
      type: 'get',
      url: rUrl('items'),
    }).then(
      function(response) {
        AppActions.receiveAllItems(response);
      },
      function(error) {
      // TODO: when fail
      }
    );
  },

  receiveAllItems: function(data){
    _DataStore = _DataStore.set('allItems', data);
    DataStore.emitChange();
  }

}, Store);

// dispatcher registry 
AppDispatcher.register(function(action) {
  var data = action.data;

  switch(action.actionType) {
    case ActionTypes.REQUEST_ALL_ITEMS:
      DataStore.requestAllItems(data);
      break;
    case ActionTypes.RECEIVE_ALL_ITEMS:
      DataStore.receiveAllItems(data);
      break;
  }
});

module.exports = DataStore;