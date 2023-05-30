import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TaskStatusEnum } from 'App/utils/enums/TaskStatusEnum'

export default class CreateTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string(),
    status: schema.enum(Object.keys(TaskStatusEnum) as Array<keyof typeof TaskStatusEnum>),
    id_board: schema.number([rules.exists({ table: 'boards', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
