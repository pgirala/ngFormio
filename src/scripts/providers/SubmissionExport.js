'use strict';

var app = angular.module('formioApp');

app.factory('SubmissionExport', [
  '$window',
  function($window) {
    return {
      export: function(formio, form, type) {
        var url = formio.projectUrl + '/form/' + form._id + '/export';
        var headers = {
          'x-expire': 300,
          'x-allow': 'GET:' + '/project/' + form.project + '/form/' + form._id + '/export'
        };
        return formio.makeRequest('tempToken', formio.projectUrl + '/token', 'GET', null, {
          headers: headers,
          ignoreCache: true
        }).then(function(tempToken) {
          $window.open(url + '?format=' + type + '&token=' + tempToken.key);
          return true;
        });
      }
    };
  }
]);