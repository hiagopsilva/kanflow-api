import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

import { types } from 'pg' // we are importing types from pg, so we can use existing enums

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    types.setTypeParser(types.builtins.NUMERIC, function (val) {
      return parseFloat(val)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
