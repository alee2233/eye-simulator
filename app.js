const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

// Set up handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Routing
const routes = require('./routes/index');
app.use('/', routes);

app.listen(port, () => {
  console.log('Listening on '+ port);
});
