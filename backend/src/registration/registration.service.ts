import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Registration } from './registration.entity';

@Injectable()
export class RegistrationService {

  constructor(

    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,

  ) {}

  async create(data: any) {

    const registration =
      this.registrationRepository.create(data);

    return await this.registrationRepository.save(
      registration
    );

  }

}