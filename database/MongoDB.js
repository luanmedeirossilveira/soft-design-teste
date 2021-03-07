require('dotenv').config()

const mongoose = require('mongoose')

/**
 * Inicia a conexão com o MongoDB
 */
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

/**
 * Verificação de conexão do MongoDB
 */
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Database connection error: '))
db.once('open', function () {
  console.log('Database connected !')
})

module.export = mongoose
