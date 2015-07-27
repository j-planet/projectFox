var React = require('react');
var $ = require('jquery');
var AppActions = require('../actions/AppActions');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppRequest = require('../http/AppRequest');
var Link = Router.Link;
var DataStore = require('../stores/DataStore');

var Home = React.createClass({
  displayName: 'Home',

  componentDidMount: function() {
    AppActions.requestAllItems();
  },

  render: function() {
    var allItems = this.props.dataStore.get('allItems');

    if (allItems){
      var items = allItems.map(function(i){
        return (
          <li>
            <img src={i.image} width="300px" />
            <div>{i.name} | Price: ${i.price}</div>
            <div>{i.description}</div>
          </li>
        );
      });
    }

    return (
      <div>
        <h1>PROJECTFOX</h1>
        {items}
      </div>
    );
  }
});

module.exports = Home;

