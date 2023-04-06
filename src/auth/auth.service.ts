import { Injectable } from '@nestjs/common';
import { User } from "../interfaces/user.interface"
import { UserDB } from "../interfaces/userDB.interface"
import * as path from "path"
import {promises as fsPromises} from "fs"
import {createHash, randomBytes} from "crypto"

@Injectable()
export class AuthService {

  private readonly usersRepo : string = "users.JSON"

  constructor(){
    /*
    if (!usersRepo){
      throw new Error ("must input a file name")
    }
    this.usersRepo = usersRepo 
    try {
      /// can't use async in constructor, then we use sync
      fs.accessSync(usersRepo)
    }
    catch {
      /// creates the usersRepo if it doesn't exist
      fs.writeFileSync(usersRepo, "[]")
    }
    */
  }

  async fetchList(): Promise<UserDB[]> {
    let filePath : string = path.join(
      "src", "auth", "usersRepo", this.usersRepo)
    let allUsers = await fsPromises.readFile(
      filePath,
      {encoding : 'utf8'})
    let users = JSON.parse(allUsers)
    return users
  }

  private async writeList(newList : UserDB[]): Promise<any>{
    await fsPromises.writeFile(
      path.join("src", "auth", "usersRepo", this.usersRepo),
      JSON.stringify(newList, null, 2))
  }

  async create(user : User): Promise<any>{
    let {email, password} = user
    let record = await this.fetchList()
    let buf = createHash('sha256').update(password).digest("hex")
    let hashedpw = buf.toString()
    let id = randomBytes(4).toString("hex")
    let userDB : UserDB = {
      email, 
      hashedpw,
      id
    }
    record.push(userDB)
    await this.writeList(record)
  }

  async userExists(mailAddress : string): Promise<Boolean> {
    let record = await this.fetchList()
    let bool : boolean = record.some(u => u.email === mailAddress)
    return bool
  }

}
