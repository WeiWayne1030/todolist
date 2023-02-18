const express = require('express')
const mongoose = require('mongoose')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect('mongodb+srv://Wayne:weiSun1030@cluster0.pflem8h.mongodb.net/?retryWrites=true&w=majority', {seNewUrlParser: true, useUnifiedTopology: true})

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

app.get('/', (req, res) =>{
  res.send('hello world')
})

app.listen(3000, () =>{
  console.log('App is running on http://localhost:3000')
})