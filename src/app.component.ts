import { Controller, Get } from "@nestjs/common";
@Controller()
export class AppController {
  @Get("")
  gettingStarted(): string { return "Kortoba Test application is running on the server"; }
}