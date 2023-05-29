import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'boards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().comment('Id do board')

      table.string('name').comment('Nome do board')

      table.string('avatar').comment('Avatar do board')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
