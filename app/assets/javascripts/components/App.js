var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

// var AppActions = require('../actions/AppActions');
var DataStore = require('../stores/DataStore');
var Uri = require('jsuri');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function() {
    return {
      dataStore: DataStore.getStore()
    };
  },

  componentWillMount: function() {
    DataStore.init(this.props.appConfig);
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this._onDataStoreChange);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onDataStoreChange);
  },

  _onDataStoreChange: function() {
    this.setState({
      dataStore: DataStore.getStore()
    });
  },

  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <img alt="PROJECTFOX" src="" />
              </a>
            </div>
          </div>
        </nav>
        {/*<TopBar />*/}
        <RouteHandler appConfig={this.props.appConfig} dataStore={this.state.dataStore} />
        {/*<Footer />*/}
      </div>
    );
  }
});

module.exports = App;

