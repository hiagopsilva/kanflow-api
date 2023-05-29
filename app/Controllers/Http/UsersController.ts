import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthUserValidator from 'App/Validators/AuthUserValidator'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import ListUserValidator from 'App/Validators/ListUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import { DateTime } from 'luxon'

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

  public async auth({ auth, request, response }: HttpContextContract) {
    try {
      const userAuthPayload = await request.validate(AuthUserValidator)

      const user = await User.findByOrFail('email', userAuthPayload.email)

      const token = await auth.use('api').attempt(userAuthPayload.email, userAuthPayload.password)

      return response.json({
        token: token.token,
        id: user.id,
        name: user.name,
        email: user.email,
      })
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

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const {
        params: { id },
      } = await request.validate(ListUserValidator)

      const user = await User.query().select('*').where('id', id).whereNull('deleted_at').first()

      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      await user
        .merge({
          deletedAt: DateTime.now(),
        })
        .save()

      return response.json({ message: 'User deleted' })
    } catch (error) {
      console.log({ error })
      return error
    }
  }
}
