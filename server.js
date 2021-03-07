const express = require('express')
const app = express()
const bodyParser = require('body-parser').json()
const PORT = 3000 || process.env.PORT
const routerLogin = require('./middleware/Login.middleware') // importa as rotas de login
const routerList = require('./middleware/ListOfBooks.middleware') // import as rotas de listas para o usuário
const routerBook = require('./middleware/BookInsertion.middleware') // importa o CRUD de livros
const routerDashboard = require('./middleware/Dashboard.middleware') // importa a rota inicial
const mongoose = require('./database/MongoDB') // importa a conexão com o MongoDB

app.use(bodyParser)

app.use('/', routerDashboard)
app.use('/login', routerLogin)
app.use('/list', routerList)
app.use('/insert', routerBook)

// eslint-disable-next-line no-unused-expressions
mongoose

app.listen(PORT)
