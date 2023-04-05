import { Injectable } from '@nestjs/common';
import {User} from "./interfaces/user.interface"
import fs from "fs"

@Injectable()
export class AppService {
  private readonly users : User[] = []

}
