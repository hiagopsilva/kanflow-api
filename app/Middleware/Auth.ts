import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import type { GuardsList } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class AuthMiddleware {
  protected redirectTo = '/login'

  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {
    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard
        return true
      }
    }

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo
    )
  }

  public async handle(
    context: HttpContextContract & { user: any },
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[]
  ) {
    await context.auth.use('api').check()

    if (!context.auth.use('api').isLoggedIn) {
      console.log({ user: context.auth.use('api').user })
      throw new Error('Unauthorized')
    }

    if (context.auth.use('api').isLoggedIn) {
      context.user = context.auth.use('api').user ?? null
    }

    const guards = customGuards.length ? customGuards : [context.auth.name]
    await this.authenticate(context.auth, guards)
    await next()
  }
}
