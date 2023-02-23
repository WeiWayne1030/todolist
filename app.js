const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')

const routes = require('./routes') //預設就會去找index
const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout:'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)



app.listen(3000, () =>{
  console.log('App is running on http://localhost:3000')
})