import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'TasksController.create')
  Route.get('/list-all', 'TasksController.listAll')
  Route.get('/list/:id', 'TasksController.list')
  Route.put('/update/:id', 'TasksController.update')
  Route.delete('/delete/:id', 'TasksController.destroy')
}).prefix('tasks')
