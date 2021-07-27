const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const ShortUrl = require('./models/shortUrls')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('hbs', exphbs({ defaultLayout: 'index', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: false }),

app.get('/', (req, res) => {
  ShortUrl.find().lean()
    .then(shortUrls => {
      console.log(shortUrls)
      return res.render('index', { shortUrls })
    })
    .catch(err => console.log(err))
}),

app.post('/shortUrls', (req, res) => {
  ShortUrl.create({ full: req.body.fullURL })
    .then(res.redirect('/'))
    .catch(err => console.log(err))
}),

app.listen(process.env.PORT || 5000))