var $ = require('jquery');
var _ = require('underscore');
var AppActions = require('../actions/AppActions');

var AppRequest = function(options) {
  // var accessToken = sessionStorage.getItem('accessToken');

  var params = {
    dataType: 'json',
    // contentType: 'application/json',
    timeout: 3 * 60 * 1000,
    // headers: {'accessToken': accessToken }
  };

  var startTime = new Date().getTime();

  var request = $.ajax(_.defaults(options, params));
  
  request
    .done(function(data) {
      var endTime = new Date().getTime();
      console.log(options.url.split('/')[2], options.url, endTime - startTime);
    })
    .fail(function(jqXHR) {
      console.log('AppRequest failed: ' + jqXHR.statusText, jqXHR.status, false);
    });
    
  return request;
};

module.exports = AppRequest;

