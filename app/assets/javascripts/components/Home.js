var React = require('react');
var $ = require('jquery');
var I = require('immutable');

var AppActions = require('../actions/AppActions');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppRequest = require('../http/AppRequest');
var Link = Router.Link;
var DataStore = require('../stores/DataStore');

var Home = React.createClass({

    displayName: 'Home',

    //propTypes: {
    //    _items: React.PropTypes.instanceOf(I.Map).isRequired
    //},

    getInitialState() {
        return {
            _items: DataStore.get('allItems')
            //_items: this.props.dataStore.get('allItems')
        };
    },

    componentWillMount: function() {
        AppActions.requestAllItems();
    },

    render: function() {
        //var allItems = this.props.dataStore.get('allItems');

        if (this.state._items){
            var items = this.state._items.map(function(i){
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

