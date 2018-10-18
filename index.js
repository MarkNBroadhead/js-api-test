const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
let db;

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: results})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
      return console.log(err)
    }
    console.log('saved quote to database')
    res.redirect('/')
  })
  console.log(req.body)
})

const dbName = 'star-wars-quotes'
MongoClient.connect('mongodb://brian:password123@localhost:27017/star-wars-quotes', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log(err)
  }
  db = client.db(dbName)
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


