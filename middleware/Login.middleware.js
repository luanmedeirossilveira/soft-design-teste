const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {
  verifyUser,
  verifyPassword,
  createUser
} = require('../utils/DataBaseFunctions')

/**
 * Rotas middleware de inicilização e sessão
 */
router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

/**
 * Verificação do nome de usuário e senha para validações
 */
passport.use(new LocalStrategy(async (username, password, done) => {
  const user = verifyUser(username)

  if (!user) {
    return done(null, false, { erro: 'Email incorreto.' })
  } else {
    const isValid = verifyPassword(
      username,
      password)
      .then(doc => console.log(doc))
      .catch(err => console.log(err))
    if (isValid) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  }
}))

/**
 * Se usuário está autenticado estará habilitado para usar
 * os restantes das rotas
 */
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user
  }
  next()
})

/**
 * Redireciona dependendo do preenchimento do login
 */
router.post('/', passport.authenticate('local', {
  successRedirect: '/list/search/:search',
  failureRedirect: '/login?fail=true',
  failureFlash: false
}))

/**
 * Verificação de falha no email ou senha
 */
router.get('/', (req, res, next) => {
  if (req.query.fail) {
    res.json({
      message: 'Email/Senha inválida'
    })
    next()
  } else {
    res.render('login')
  }
})

/**
 * Disponibilidade de registro de um novo usuário
 */
router.post('/register', (request, response, next) => {
  const { username, password } = request.body

  verifyUser(username).then(user => {
    if (user) {
      response.status(401).json({
        error: 'Email already created!'
      })
    } else {
      createUser(username, password).then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  })

  next()
})

module.exports = router
