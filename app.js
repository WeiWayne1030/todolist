const express = require('express')
const mongoose = require('mongoose')
const app = express()

const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect('mongodb+srv://Wayne:weiSun1030@cluster0.pflem8h.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout:'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) =>{
  res.render('index')
})

app.listen(3000, () =>{
  console.log('App is running on http://localhost:3000')
})