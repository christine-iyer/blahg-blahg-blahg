const express = require('express');
require('dotenv').config()
require('./config/database')

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const port = process.env.PORT || 3002;

const app = express();


app.use(express.json());

app.use((req, res, next) => {
     res.locals.data = {}
     next()
 })
 app.use(logger('dev'));

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));





// Put API routes here, before the "catch all" route
app.use('/api/blahgs', require('./routes/api/blahgs'))



// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, function() {
     console.log(`Express app running on port ${port}`)
   });