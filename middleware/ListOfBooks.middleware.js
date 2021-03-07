const router = require('express').Router()
const { findBooks, findOneBook, findAndUpdateRented } = require('../utils/DataBaseFunctions')
/**
 * OBS.: Para utilizar sem restrições, comentar este middleware
 * de autenticação para testes dos demais
 */
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(401).json({
      error: 'You are not logged in!'
    })
  }
})

/**
 * Procura por todos livros com ou sem filtro
 */
router.get('/search/:search', (request, response) => {
  const search = request.query

  const bookList = findBooks(search)

  bookList.then(book => {
    response.json({
      msg: 'Lista de Livros',
      filter: search,
      books: book
    })
  })
})

/**
 * Procura por um livro através do seu filtro
 */
router.get('/filter/:filter', (request, response) => {
  const filterValue = request.query.value

  const bookSearch = findOneBook(filterValue)

  bookSearch.then(book => {
    if (book) {
      response.json({
        Filter: `Name => ${filterValue}`,
        book
      })
    } else {
      response.json({
        Filter: `Name => ${filterValue}`,
        books: 'Empty ;('
      })
    }
  })
})

/**
 * Aluga o livro para o usuário selecionado se disponível
 */
router.post('/rented/:filter', async (request, response) => {
  const { filter, user } = request.query

  const bookRented = findOneBook(filter)

  bookRented.then(book => {
    if (book.rented === true) {
      response.json({
        book,
        msg: `Ops! It is already rented by ${book.user} ;(`
      })
    } else {
      findAndUpdateRented(filter, user)
      response.json({
        book,
        msg: 'Yeah! Rented ;)'
      })
    }
  })
})

module.exports = router
