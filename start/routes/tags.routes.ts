import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'TagsController.create')
  Route.get('/list-all', 'TagsController.listAll')
  Route.get('/list/:id', 'TagsController.list')
  Route.put('/update/:id', 'TagsController.update')
  Route.delete('/delete/:id', 'TagsController.destroy')
})
  .prefix('tags')
  .middleware('auth')
