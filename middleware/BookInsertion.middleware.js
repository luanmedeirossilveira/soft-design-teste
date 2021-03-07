const { createBook, filterAndUpdate, deleteBook } = require('../utils/DataBaseFunctions')

const router = require('express').Router()

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
 * Cria um novo livro
 */
router.post('/', async (request, response) => {
  const book = request.body
  createBook(book)

  response.send('create book')
})

/**
 * Filtra e atualiza o livro selecionado
 */
router.put('/', async (request, response) => {
  const filter = request.body.filter
  const update = request.body.update

  filterAndUpdate(filter, update).then(book => {
    response.json({
      message: 'update book',
      book
    })
  })
})

/**
 * Exclui um livro do banco de dados
 */
router.delete('/', async (request, response) => {
  const filter = request.body.filter

  deleteBook(filter).then(bookDetails => {
    response.json({
      message: 'Delete with success!',
      bookDetails
    })
  })
})

module.exports = router
