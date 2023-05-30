import type { HttpLoggedContextContract } from '@ioc:Adonis/Core/HttpContext'

import Task from 'App/Models/Task'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'

export default class TasksController {
  public async create({ request, response }: HttpLoggedContextContract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { title, description, status, id_board } = await request.validate(CreateTaskValidator)

    const task = await Task.create({
      title,
      description,
      status,
      id_board,
    })

    return response.status(201).json(task)
  }

  public async listAll({ response }: HttpLoggedContextContract) {
    const tasks = await Task.query().select('*').whereNull('deleted_at')

    return response.status(200).json(tasks)
  }
}
