const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

// Set up handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Routing
const routes = require('./routes/index');
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
