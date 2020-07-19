// Import dependancies
const express = require('express');
const bodyParser = require('body-parser');

// Setup app
const app = express();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Setup view engine
app.set('view engine', 'ejs');

// Setup static files
app.use(express.static('./public'));

// Create sample data
/*const install = require('./mongoController.js').install;

install();*/

const todo = require('./mongoController.js').todo;

app.get('/todo', (req, res) => {
  // Get data from mongoDB and pass to the view
  todo.find({}, (err, data) => {
    if(err) throw err;
    res.render('todo', { todos: data });
  });
});

app.post('/todo', urlencodedParser, (req, res) => {
  // Get data from the view and add it to mongoDB
  const td = req.body.item;
  todo.create({ item: td }, function(err, data){
    if(err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item', (req, res) => {
  // Delete the requested item from mongoDB
  let item = req.params.item.replace(/\-/g, ' ');

  todo.find({ item: item }).deleteOne((err, data) => {
    if(err) throw err;
    res.json(data);
  });
});

// Setup server
const server = app.listen(process.env.PORT || 1234, '127.0.0.1', () => {
  console.log('Listening on Localhost@Port ' + server.address().port)
});
