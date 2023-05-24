import Route from '@ioc:Adonis/Core/Route'

import './routes/user.routes'

Route.get('/', async () => {
  return { hello: 'world' }
})
