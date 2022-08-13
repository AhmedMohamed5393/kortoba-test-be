import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get("")
  gettingStarted(): string { return "Gift Shop application is running on the server"; }
}