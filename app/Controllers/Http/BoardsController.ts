import type { HttpLoggedContextContract } from '@ioc:Adonis/Core/HttpContext'
import Board from 'App/Models/Board'
import Task from 'App/Models/Task'
import ListBoardValidator from 'App/Validators/ListBoardValidator'
import SaveBoardValidator from 'App/Validators/SaveBoardValidator'
import { DateTime } from 'luxon'

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

  public async getDataForBoard({ user, response }: HttpLoggedContextContract) {
    try {
      const boards = await Board.query().where('id_user', user.id).whereNull('deleted_at')

      const tasks = await Task.query().where('id_board', boards[0].id).whereNull('deleted_at')

      return response.json({
        current: {
          board: boards[0],
          tasks,
        },
        boards: boards.slice(1),
      })
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

  public async update({ user, request, response }: HttpLoggedContextContract) {
    try {
      const {
        params: { id },
      } = await request.validate(ListBoardValidator)

      const { name, avatar } = await request.validate(SaveBoardValidator)

      const board = await Board.query()
        .where('id_user', user.id)
        .where('id', id)
        .whereNull('deleted_at')
        .first()

      if (!board) {
        return response.status(404).json({ message: 'Board not found' })
      }

      board.name = name
      board.avatar = avatar || ''

      await board.save()

      return response.json(board)
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  public async destroy({ user, request, response }: HttpLoggedContextContract) {
    try {
      const {
        params: { id },
      } = await request.validate(ListBoardValidator)

      const board = await Board.query()
        .where('id_user', user.id)
        .where('id', id)
        .whereNull('deleted_at')
        .first()

      if (!board) {
        return response.status(404).json({ message: 'Board not found' })
      }

      board.deletedAt = DateTime.now()

      await board.save()

      return response.json(board)
    } catch (error) {
      console.log({ error })
      return error
    }
  }
}
