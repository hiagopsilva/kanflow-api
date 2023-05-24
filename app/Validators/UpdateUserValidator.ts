import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
    }),
    name: schema.string(),
    email: schema.string(),
    avatar: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
