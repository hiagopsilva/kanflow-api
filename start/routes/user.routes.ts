import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'UsersController.create')
  Route.get('/list-all', 'UsersController.listAll')
}).prefix('users')
