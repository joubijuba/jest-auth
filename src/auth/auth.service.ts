import { Injectable } from '@nestjs/common';
import {User} from "../interfaces/user.interface"
import fs from "fs"

@Injectable()
export class AuthService {
  private readonly users : User[] = []

  /*
  async fetchList() : User[]{
    let allUsers = await fs.promises.readFile("../usersRepo/users.JSON")
  }
  */

  create(user : User) {
    this.users.push(user)
  }

  readAll() : User[] {
    return this.users;
  }

}
