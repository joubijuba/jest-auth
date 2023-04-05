import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from "../interfaces/user.interface"

@Controller()
export class AuthController {

  authService : AuthService 

  constructor(
    ) {
    this.authService = new AuthService ()
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
  async signingUp(@Body() user : User){
    // let bool : boolean = await this.authService.userExists(user.email)
    let bool = false 
    if (bool){
        return "user already exists" 
    }
    else {
      if (user.password !== user.passwordConfirmation){
        return "please input the same password"
      }
      else {
        await this.authService.create(user)
        return "successfully signed up"
      }
    }
  }

  /// signin page
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
