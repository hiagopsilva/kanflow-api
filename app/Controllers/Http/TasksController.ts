import type { HttpLoggedContextContract } from '@ioc:Adonis/Core/HttpContext'

import Task from 'App/Models/Task'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'
import ListAllTaskValidator from 'App/Validators/ListAllTaskValidator'
import ListTaskValidator from 'App/Validators/ListTaskValidator'
import UpdateTaskValidator from 'App/Validators/UpdateTaskValidator'
import { DateTime } from 'luxon'

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

  public async listAll({ request, response }: HttpLoggedContextContract) {
    const {
      params: { id },
    } = await request.validate(ListAllTaskValidator)

    const tasks = await Task.query().select('*').where('id_board', id).whereNull('deleted_at')

    return response.status(200).json(tasks)
  }

  public async list({ request, response }: HttpLoggedContextContract) {
    const {
      params: { id },
    } = await request.validate(ListTaskValidator)

    const task = await Task.query()
      .select('*')
      .where('id', id)
      .whereNull('deleted_at')
      .firstOrFail()

    return response.status(200).json(task)
  }

  public async update({ request, response }: HttpLoggedContextContract) {
    const {
      params: { id },
    } = await request.validate(ListTaskValidator)

    const { title, description, status } = await request.validate(UpdateTaskValidator)

    const task = await Task.query().where('id', id).whereNull('deleted_at').firstOrFail()

    task.title = title
    task.description = description
    task.status = status

    await task.save()

    return response.status(200).json(task)
  }

  public async destroy({ request, response }: HttpLoggedContextContract) {
    const {
      params: { id },
    } = await request.validate(ListTaskValidator)

    const task = await Task.query().where('id', id).whereNull('deleted_at').firstOrFail()

    task.deletedAt = DateTime.now()

    await task.save()

    return response.status(200).json({ message: 'Task deleted successfully' })
  }
}
