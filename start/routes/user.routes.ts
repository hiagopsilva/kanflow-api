import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'UsersController.create')
  Route.get('/list-all', 'UsersController.listAll')
  Route.get('/list/:id', 'UsersController.list')
}).prefix('users')
