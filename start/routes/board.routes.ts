import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'BoardsController.create')
  Route.get('/list-all', 'BoardsController.listAll')
  Route.get('/list/:id', 'BoardsController.list')
  Route.put('/update/:id', 'BoardsController.update')
  Route.delete('/delete/:id', 'BoardsController.destroy')
})
  .prefix('boards')
  .middleware('auth')
