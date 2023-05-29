import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import SaveBoardValidator from 'App/Validators/SaveBoardValidator'

export default class BoardsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const { name, avatar } = await request.validate(SaveBoardValidator)

      const board = await Board.create({ name, avatar })

      return response.json(board)
    } catch (error) {
      console.log({ error })
      return error
    }
  }
}
