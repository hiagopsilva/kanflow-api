import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TaskStatusEnum } from 'App/utils/enums/TaskStatusEnum'

export default class UpdateTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string(),
    status: schema.enum(Object.keys(TaskStatusEnum) as Array<keyof typeof TaskStatusEnum>),
  })

  public messages: CustomMessages = {}
}
