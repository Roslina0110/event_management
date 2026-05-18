import {
  Body,
  Controller,
  Post
} from '@nestjs/common';

import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {

  constructor(
    private readonly registrationService: RegistrationService
  ) {}

  @Post()
  create(@Body() body: any) {

    return this.registrationService.create(body);

  }

}