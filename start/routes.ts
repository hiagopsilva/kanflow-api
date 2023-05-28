import Route from '@ioc:Adonis/Core/Route'

import './routes/user.routes'

Route.post('/auth', 'UsersController.auth')

Route.get('/', async () => {
  return { hello: 'world' }
})
