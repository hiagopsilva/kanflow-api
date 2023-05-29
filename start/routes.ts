import Route from '@ioc:Adonis/Core/Route'

import './routes/user.routes'
import './routes/board.routes'
import './routes/tags.routes'

Route.post('/auth', 'UsersController.auth')

Route.get('/', async () => {
  return { hello: 'world' }
})
