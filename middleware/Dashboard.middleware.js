const router = require('express').Router()

// Rota inicial de redirecionamento ao login
router.get('/', (request, response) => {
  response.redirect('/login')
})

module.exports = router
