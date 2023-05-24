import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import ListUserValidator from 'App/Validators/ListUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

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
  public async list({ request, response }: HttpContextContract) {
    try {
      const {
        params: { id },
      } = await request.validate(ListUserValidator)

      const user = await User.query().select('*').where('id', id).whereNull('deleted_at').first()

      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      return response.json(user)
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const {
        params: { id },
        name,
        email,
        avatar,
      } = await request.validate(UpdateUserValidator)

      const user = await User.query().select('*').where('id', id).whereNull('deleted_at').first()

      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      await user
        .merge({
          name,
          email,
          avatar,
        })
        .save()

      return response.json(user)
    } catch (error) {
      console.log({ error })
      return error
    }
  }
}
