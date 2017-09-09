const express = require('express')
const bodyParser = require('body-parser')
const todoController = require('./controladors/todoController')

const app = express()

//template engine
app.set('view engine', 'ejs')
//per carregar fitxers
app.user(express.static('.'))

//contorladors
todoController(app)

app.listen(8080)

console.log('Escoltant al 8080...')
