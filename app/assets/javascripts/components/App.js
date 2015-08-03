var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Uri = require('jsuri');
// Components
var TopBar = require('./Shared/TopBar');
var SignInForm = require('./Shared/SignInForm');
var SignUpForm = require('./Shared/SignUpForm');
// Stores 
var SessionStore = require('../stores/SessionStore');
var DataStore = require('../stores/DataStore');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    error:      SessionStore.getError(),
    userInfo:   SessionStore.getUserInfo()
  };
}

var App = React.createClass({
  displayName: 'App',

  getInitialState: function() {
    return {
      session:   getStateFromStores(),
      dataStore: DataStore.getStore()
    };
  },

  componentWillMount: function() {
    SessionStore.init(this.props.appConfig);
    DataStore.init(this.props.appConfig);
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onSessionChange);
    DataStore.addChangeListener(this._onDataStoreChange);
    var jwt = new Uri(location.search).getQueryParamValue('jwt');

    if(!!jwt){
      var data = {access_token: jwt}
      SessionActions.receiveLogin(data,null);
      SessionActions.requestUserInfo();  
      location.href = sessionStorage.getItem('currentUrl');
      sessionStorage.removeItem('currentUrl');
    }
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onDataStoreChange);
  },

  _onSessionChange: function() {
    this.setState({
      session: getStateFromStores()
    });
  },

  _onDataStoreChange: function() {
    this.setState({
      dataStore: DataStore.getStore()
    });
  },

  toggleSignUp: function(){
    this.refs.SignUpForm.openModal();
  },

  toggleSignIn: function(){
    this.refs.SignInForm.openModal();
  },

  render: function() {
    return (
      <div>
        <SignInForm session={this.state.session} ref='SignInForm' toggleSignUp={this.toggleSignUp}/>
        <SignUpForm session={this.state.session} ref='SignUpForm'/>
        <TopBar session={this.state.session} toggleSignIn={this.toggleSignIn} />
        <RouteHandler appConfig={this.props.appConfig} dataStore={this.state.dataStore} />
        {/*<Footer />*/}
      </div>
    );
  }
});

module.exports = App;

