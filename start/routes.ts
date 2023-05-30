import Route from '@ioc:Adonis/Core/Route'

import './routes/user.routes'
import './routes/board.routes'
import './routes/tags.routes'
import './routes/tasks.routes'

Route.post('/auth', 'UsersController.auth')

Route.get('/', async () => {
  return { hello: 'world' }
})
