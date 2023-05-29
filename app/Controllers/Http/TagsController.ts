import type { HttpLoggedContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import CreateTagValidator from 'App/Validators/CreateTagValidator'
import ListTagValidator from 'App/Validators/ListTagValidator'

export default class TagsController {
  public async create({ request, response }: HttpLoggedContextContract) {
    const { name } = await request.validate(CreateTagValidator)

    const tag = await Tag.create({ name })

    return response.json(tag)
  }

  public async listAll({ response }: HttpLoggedContextContract) {
    const tags = await Tag.all()

    return response.json(tags)
  }

  public async list({ request, response }: HttpLoggedContextContract) {
    const {
      params: { id },
    } = await request.validate(ListTagValidator)

    const tag = await Tag.findByOrFail('id', id)

    return response.json(tag)
  }

  public async update({ request, response }: HttpLoggedContextContract) {
    const {
      params: { id },
    } = await request.validate(ListTagValidator)

    const { name } = await request.validate(CreateTagValidator)

    const tag = await Tag.findByOrFail('id', id)

    tag.name = name

    await tag.save()

    return response.json(tag)
  }
}
