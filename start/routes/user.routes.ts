import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'UsersController.create')
}).prefix('users')
