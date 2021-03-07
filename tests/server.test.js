jest.useFakeTimers()
const app = require('../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const Login = require('../models/Login.model')
const Book = require('../models/Book.model')

describe('Testando CRUD com o banco de dados.', () => {
  const MONGO_URL = process.env.DB_URL

  beforeAll(async () => {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function (err, db) { })
  })

  it('Criando um login de teste.', async done => {
    const response = await request
      .post('/login/register')
      .send({
        username: 'luan',
        password: '1234'
      })
    
    const user = await Login.findOne({ username: 'luan' })

    expect(user.username).toBeTruthy()
    expect(user.password).toBeTruthy()

    done()
  }, 30000)

  it('Obtento login de teste.', async done => {
    const response = await request
      .post('/login')
      .send({
        username: 'luan',
        password: '1234'
      })
    
    expect(response.status).toBe(302)
    
    done()
  })

  it('Obtento lista de livros.', async done => {
    const response = await request
      .get('/list/search/:search')
      .query({})

      const book = await Book.find()

      expect(book).toBeTruthy()

      done()
  }, 30000)

  it('Obtento descrição de um livro.', async done => {
    const response = await request
      .get('/list/filter/:filter')
      .query({
        value: 'O morro dos ventos uivantes'
      })

      const book = await Book.findOne({name: 'O morro dos ventos uivantes'})

      expect(book.name).toBeTruthy()
      expect(book.year).toBeTruthy()
      expect(book.author).toBeTruthy()
      expect(book.company).toBeTruthy()
      expect(book.user).toBeTruthy()

      done()
  }, 30000)

  it('Obtendo aluguel Livro.', async done => {
    const response = await request
      .post('/list/rented/:filter')
      .query({
        filter: 'O morro dos ventos uivantes',
        user: 'luan'
      })

      const book = await Book.findOne({name: 'O morro dos ventos uivantes'})

      expect(book.name).toBeTruthy()
      expect(book.year).toBeTruthy()
      expect(book.author).toBeTruthy()
      expect(book.company).toBeTruthy()
      expect(book.user).toBeTruthy()
      expect(book.rented).toBe(true)

      done()
  }, 30000)

  it('Criando um novo livro.', async done => {
    const response = await request
      .post('/insert')
      .send({
        name: 'Novo livro',
        year: '2012',
        author: 'Emily Brontë',
        company: 'LandMark',
        rented: true,
        user: 'franciele'
      })

      const book = await Book.findOne({name: 'Novo livro'})

      expect(book.name).toBeTruthy()
      expect(book.year).toBeTruthy()
      expect(book.author).toBeTruthy()
      expect(book.company).toBeTruthy()
      expect(book.user).toBeTruthy()
      expect(book.rented).toBe(true)

      done()
  }, 30000)

  it('Atualizando um livro.', async done => {
    const response = await request
      .put('/insert')
      .send({
        filter: {
          name: 'Novo livro'
        },
        update: {
          "rented": false
        }
      })

      const book = await Book.findOne({name: 'Novo livro'})

      expect(book.name).toBeTruthy()
      expect(book.year).toBeTruthy()
      expect(book.author).toBeTruthy()
      expect(book.company).toBeTruthy()
      expect(book.user).toBeTruthy()
      expect(book.rented).toBe(false)

      done()
  }, 30000)

  it('Excluindo um livro.', async done => {
    const response = await request
      .delete('/insert')
      .send({
        filter: {
          name: 'Novo livro'
        }
      })

      const book = await Book.findOne({name: 'Novo livro'})

      expect(book).toBe(null)

      done()
  }, 30000)

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('logins')
    await mongoose.connection.db.dropCollection('books')
  })
})


