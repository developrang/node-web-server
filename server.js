const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} - ${req.url}`;

  fs.appendFile('server.log', log + '\n', err => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next()
})

// app.use((req, res, next) => {
//   res.render('maintance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express App</h1>');
  res.render('home.hbs', {
    welcomeMessage:'Welcome to my website',
    pageTitle:'Home Page'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle:'About Page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'The page you are looking doesn\'t found!'
  })
});

app.listen(3000, () => {
  console.log(`The server is up and running on port ${port}.`)
})
