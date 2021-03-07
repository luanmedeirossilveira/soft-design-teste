const BookModel = require('../models/Book.model')
const LoginModel = require('../models/Login.model')

/**
 * Procura por todos livros no banco de dados sem ou com filtro
 * @param {*} name
 * @returns livros com filtro ou/e sem filtro
 */
async function findBooks (search) {
  const book = await BookModel.find(search)

  return book
}

/**
 * Procura por um livro no banco de dados
 * @param {*} filter
 * @returns livro selecionado
 */
async function findOneBook (filter) {
  const book = await BookModel.findOne({ name: filter })

  return book
}

/**
 * Procura o livro selecionado e vê se está alugado, se não, o usuário poderá
 * alugá-lo, senão, ele é restringido
 * @param {*} filter
 * @param {*} user
 * @returns the book found in the database
 */
async function findAndUpdateRented (filter, user) {
  const book = await BookModel.findOneAndUpdate({ name: filter }, { rented: true, user })

  return book
}

/**
 * Cria um novo livro no banco de dados
 * @param {*} newBook
 * @returns o livro criado no banco de dados
 */
async function createBook (newBook) {
  const book = await BookModel.create(newBook)

  return book
}

/**
 * Filtra e atualiza o livro selecionado
 * @param {*} filter
 * @param {*} update
 * @returns o livro já atualiado
 */
async function filterAndUpdate (filter, update) {
  const bookUpdate = await BookModel.findOneAndUpdate(filter, update, {
    new: true
  })

  return bookUpdate
}

/**
 * Exclui o livro selecionado no banco de dados
 * @param {*} filter
 * @returns os detalhes da exclusão
 */
async function deleteBook (filter) {
  const bookDelete = await BookModel.deleteOne(filter)

  return bookDelete
}

/**
 * Verifica se existe o usuário no banco de dados
 * @param {*} username
 * @returns se existe o usuário
 */
async function verifyUser (username) {
  const user = await LoginModel.findOne({ username })

  return user
}

/**
 * Cria um novo usuário no sistema
 * @param {*} username
 * @param {*} password
 * @returns o novo usuário
 */
async function createUser (username, password) {
  const newUser = await LoginModel.create({
    username,
    password
  })

  return newUser
}
module.exports = {
  createBook,
  createUser,
  deleteBook,
  filterAndUpdate,
  findAndUpdateRented,
  findBooks,
  findOneBook,
  verifyUser
}
