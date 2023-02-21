const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const { findById } = require('./models/todo')

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

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
  //get all todo data
  Todo.find()
    .lean()
    .then(todos => res.render('index', {todos: todos}))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) =>{
  return res.render('new')
})

app.post('/todos', (req,res) =>{
  const name = req.body.name
  return Todo.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) =>{
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', {todo}))
    .catch(error => console.log(error))
})
app.get('/todos/:id/edit', (req, res) =>{
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', {todo}))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) =>{
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo =>{
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(()=> res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (req,res) =>{
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () =>{
  console.log('App is running on http://localhost:3000')
})