import type { HttpLoggedContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import CreateTagValidator from 'App/Validators/CreateTagValidator'

export default class TagsController {
  public async create({ request, response }: HttpLoggedContextContract) {
    const { name } = await request.validate(CreateTagValidator)

    const tag = await Tag.create({ name })

    return response.created(tag)
  }
}
