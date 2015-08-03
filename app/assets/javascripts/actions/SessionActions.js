var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  signup: function(signupInfo) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SIGNUP_REQUEST,
      signupInfo: signupInfo
    });
  },

  login: function(email, password) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
  },

  logout: function() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGOUT
    });
  },

  receiveLogin: function(json,error) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGIN_RESPONSE,
      json: json,
      error: error
    });
  },

  requestUserInfo: function(){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_INFO,
    });
  },
  receiveUserInfo: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_INFO,
      data: data
    });
  }

};