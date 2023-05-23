import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    try {
      const { name, email, password } = await request.validate(CreateUserValidator)

      return response.json({ name, email, password })
    } catch (error) {
      return error
    }
  }
}
