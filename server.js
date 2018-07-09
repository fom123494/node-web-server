/**/
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')) // Using middle ware

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });

  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => { // request, response
  //res.send('<h1>Hello Express!<h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to my website'
  });
});
// Make about route (localhost:3000/about)
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  }); // Rendering dynamic page
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request' // Send JSON data
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
}); // listen @port 3000
