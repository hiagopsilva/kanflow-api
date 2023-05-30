import type { HttpLoggedContextContract } from '@ioc:Adonis/Core/HttpContext'

import Task from 'App/Models/Task'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'

export default class TasksController {
  public async create({ request, response }: HttpLoggedContextContract) {
    const { title, description, status } = await request.validate(CreateTaskValidator)

    const task = await Task.create({
      title,
      description,
      status,
    })

    return response.status(201).json(task)
  }
}
