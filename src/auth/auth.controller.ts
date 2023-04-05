import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from "../interfaces/user.interface"

@Controller()
export class AuthController {

  constructor(
    private readonly authService : AuthService
    ) {
    this.authService = authService
  }

  @Get()
  test(){ 
    return "test"
  }
  /// signup page
  @Get("signup")
  getSignUpPage(): any {
    return (
      `<div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>`
    )
  }

  @Post("signup")
  signingUp(@Body() user : User): string {
    let usersCopy : User [] 
    usersCopy = this.authService.readAll()
    usersCopy.forEach(u => {
      if (u.email === user.email){
        return "this user already exists"
      }
    })
    if (user.password !== user.passwordConfirmation){
        return "must input same password" 
    }
    this.authService.create(user)
    return "successfully signed up"
  }

  @Get("signin")
  getSignInPage() : any {
    return (`
    <div>
    <form method="POST">
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" />
      <button>Sign In</button>
    </form>
    </div> 
    `)
  }

}
