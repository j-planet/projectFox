var _ = require('underscore');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppRequest = require('../http/AppRequest');
var I = require('immutable');
var Store = require('./Store');
var SessionActions = require('../actions/SessionActions');
var ActionTypes = AppConstants.ActionTypes;
var APIEndpoints = AppConstants.APIEndpoints;

// relative_url
function rUrl(url) {
  return _SessionStore.get('baseUrl') + url;
}

var _SessionStore = I.fromJS({
  accessToken:  sessionStorage.getItem('accessToken'),
  error:        null,
  userInfo:     sessionStorage.getItem('userInfo')
});

var SessionStore = _.extend({
  init: function(config) {
    _SessionStore = _SessionStore.merge(config);
  },
  isLoggedIn: function() {
    return _SessionStore.get('accessToken') ? true : false;    
  },

  getAccessToken: function() {
    return _SessionStore.get('accessToken');
  },
  getUserInfo: function(){
    var userInfo = _SessionStore.get('userInfo');
    if(userInfo == "undefined" || userInfo == null){
      rtv = null;
    } else {
      rtv = JSON.parse(_SessionStore.get('userInfo'));
    }
    return rtv;
  },
  getError: function() {
    return _SessionStore.get('error');
  },

  signup: function(signupInfo){
    AppRequest({
      type: 'post',
      url: rUrl('auth/register'),
      data: signupInfo,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}
    }).then(
      function(data) {
        SessionActions.receiveLogin(data,null);
      },
      function(error) {
        SessionActions.receiveLogin(null,error);
      }
    );
  },

  login: function(email,password){
    AppRequest({
      url: rUrl('auth/login'),
      data: { email: email, password: password }
    }).then(
      function(data) {
        SessionActions.receiveLogin(data,null);
      },
      function(error) {
        SessionActions.receiveLogin(null,error);
      }
    );
  },
  loginResponse: function(data){
    if (data.json && data.json.access_token) {
      _SessionStore = _SessionStore.set('accessToken',data.json.access_token);
      _SessionStore = _SessionStore.set('error',null);
      _SessionStore = _SessionStore.set('userInfo',JSON.stringify(data.json.user_info));
      // Token will always live in the session, so that the API can grab it with no hassle
      sessionStorage.setItem('accessToken', data.json.access_token);
      sessionStorage.setItem('userInfo',JSON.stringify(data.json.user_info));

    }
    if (data.error) {
      _SessionStore = _SessionStore.set('error',data.error);
    }
    SessionStore.emitChange();
  },
  requestUserInfo: function(){
    AppRequest({
      type:   'GET',
      url:    rUrl('oauth_user_info'),
    }).then(
      function(data){
        SessionActions.receiveUserInfo(data);
        // TODO: save it somewhere
      },
      function(error){
        // when fail
      }
    );
  },
  receiveUserInfo: function(data){
    _SessionStore = _SessionStore.set('userInfo',JSON.stringify(data));
    sessionStorage.setItem('userInfo',JSON.stringify(data));
    SessionStore.emitChange();
  }
}, Store);

AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case ActionTypes.LOGIN_RESPONSE:
      SessionStore.loginResponse(action);
      break;

    case ActionTypes.LOGIN_REQUEST:
      SessionStore.login(action.email,action.password);
      break;

    case ActionTypes.LOGOUT:
      _SessionStore = _SessionStore.set('accessToken',null);
      _SessionStore = _SessionStore.set('userInfo',null);
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('userInfo');
      SessionStore.emitChange();
      break;

    case ActionTypes.SIGNUP_REQUEST:
      SessionStore.signup(action.signupInfo);
      break;

    case ActionTypes.REQUEST_USER_INFO:
      SessionStore.requestUserInfo();
      break;

    case ActionTypes.RECEIVE_USER_INFO:
      SessionStore.receiveUserInfo(action.data);
      break;

    default:
  }

});

module.exports = SessionStore;