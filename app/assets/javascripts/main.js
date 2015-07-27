var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

// Load the CSS for our app.
// TODO - break this up per component for better loading performance.

require('../stylesheets/bootstrap-css/css/bootstrap.css');
require('../stylesheets/bootstrap-css/css/bootstrap-theme.css');
require('../stylesheets/bootstrap-css/css/bootstrap-social.css');

// Copy the favicon to the public directory
//var url = require('../images/favicon.png');

exports.$ = $;
exports._ = _;
exports.React = React;
exports.app = function(appConfig) {
  require('./Router').createRoutes(appConfig);
};
