import type { HttpLoggedContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import ListBoardValidator from 'App/Validators/ListBoardValidator'
import SaveBoardValidator from 'App/Validators/SaveBoardValidator'

export default class BoardsController {
  public async create({ user, request, response }: HttpLoggedContextContract) {
    try {
      const { name, avatar } = await request.validate(SaveBoardValidator)

      const board = await Board.create({ name, avatar, id_user: user.id })

      return response.json(board)
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  public async listAll({ user, response }: HttpLoggedContextContract) {
    try {
      const boardList = await Board.query().where('id_user', user.id).whereNull('deleted_at')

      return response.json(boardList)
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  public async list({ user, request, response }: HttpLoggedContextContract) {
    try {
      const {
        params: { id },
      } = await request.validate(ListBoardValidator)

      const board = await Board.query()
        .where('id_user', user.id)
        .where('id', id)
        .whereNull('deleted_at')
        .first()

      return response.json(board)
    } catch (error) {
      console.log({ error })
      return error
    }
  }
}
