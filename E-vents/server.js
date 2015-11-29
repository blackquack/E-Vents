#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./server/app');


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

console.log('Server running at http://127.0.0.1:' + 3000 + '/');


