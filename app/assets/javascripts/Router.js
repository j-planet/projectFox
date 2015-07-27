var React = require('react');
var ReactRouter = require('react-router');

// pages
var App = require('./components/App');
var Home = require('./components/Home');
// var Home = require('./components/Users');
// var Home = require('./components/Items');

// var div = React.DOM.div;

var Route = ReactRouter.Route,
  NotFoundRoute = ReactRouter.NotFoundRoute,
  DefaultRoute = ReactRouter.DefaultRoute,
  Redirect = ReactRouter.Redirect;


module.exports = {
  createRoutes: function(appConfig) {
    var routes = (
      <Route name='app' path='/' handler={App}>
        <DefaultRoute name="home" handler={Home} />
        {/*<Route name="users" path='/u' handler={Users} />
        <Route name="items" path='/i' handler={Items} />*/}
      </Route>
    );

    ReactRouter.run(routes, function(Handler, state) {
      React.render(<Handler appConfig={appConfig} params={state.params}/>, document.body);
    });
  }
};

