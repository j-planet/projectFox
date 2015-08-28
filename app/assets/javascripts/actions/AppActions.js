var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var AppActions = {
  // Items
  requestAllItems: function(){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_ALL_ITEMS
    });
  },
  receiveAllItems: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_ALL_ITEMS,
      data: data
    });
  }
};

module.exports = AppActions;
