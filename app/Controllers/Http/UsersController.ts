import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    try {
      const { name, email, password } = await request.validate(CreateUserValidator)

      const user = await User.create({ name, email, password })

      return response.json(user)
    } catch (error) {
      console.log({ error })
      return error
    }
  }
  public async listAll({ response }: HttpContextContract) {
    try {
      const user = await User.query().select('*').whereNull('deleted_at')

      return response.json(user)
    } catch (error) {
      console.log({ error })
      return error
    }
  }
}
