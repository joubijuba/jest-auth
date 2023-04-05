import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from "./interfaces/user.interface"

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {
    this.appService = appService
  }

  /// signup page
  @Get()
  welcomePage() : string {
    return 'welcome ser'
  }


}
