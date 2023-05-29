declare module '@ioc:Adonis/Core/HttpContext' {
  import User from 'App/Models/User'
  import Auth from 'App/Models/Auth'
  import apm from 'elastic-apm-node'

  interface HttpContextContract {
    user: User | null
    apmTransaction: apm.Transaction | null
  }

  interface HttpLoggedContextContract extends HttpContextContract {
    user: User
  }
}
