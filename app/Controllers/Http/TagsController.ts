import type { HttpLoggedContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import CreateTagValidator from 'App/Validators/CreateTagValidator'
import ListTagValidator from 'App/Validators/ListTagValidator'
import { DateTime } from 'luxon'

export default class TagsController {
  public async create({ request, response }: HttpLoggedContextContract) {
    try {
      const { name } = await request.validate(CreateTagValidator)

      const tag = await Tag.create({ name })

      return response.json(tag)
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  public async listAll({ response }: HttpLoggedContextContract) {
    try {
      const tags = await Tag.query().whereNull('deleted_at')

      return response.json(tags)
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  public async list({ request, response }: HttpLoggedContextContract) {
    try {
      const {
        params: { id },
      } = await request.validate(ListTagValidator)

      const tag = await Tag.query().where('id', id).whereNull('deleted_at').first()

      return response.json(tag)
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  public async update({ request, response }: HttpLoggedContextContract) {
    try {
      const {
        params: { id },
      } = await request.validate(ListTagValidator)

      const { name } = await request.validate(CreateTagValidator)

      const tag = await Tag.query().where('id', id).whereNull('deleted_at').first()

      if (!tag) {
        return response.status(404).json({ message: 'Tag not found' })
      }

      tag.name = name

      await tag.save()

      return response.json(tag)
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  public async destroy({ request, response }: HttpLoggedContextContract) {
    try {
      const {
        params: { id },
      } = await request.validate(ListTagValidator)

      const tag = await Tag.query().where('id', id).whereNull('deleted_at').first()

      if (!tag) {
        return response.status(404).json({ message: 'Tag not found' })
      }

      tag.deletedAt = DateTime.now()

      await tag.save()

      return response.json(tag)
    } catch (error) {
      console.log({ error })
      return error
    }
  }
}
