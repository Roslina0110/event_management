import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationModule } from './registration/registration.module';

@Module({

  imports: [

    TypeOrmModule.forRoot({

      type: 'mysql',

      host: 'localhost',

      port: 3306,

      username: 'root',

      password: 'Roslinamanue@1979',

      database: 'event_management',

      autoLoadEntities: true,

      synchronize: true,

    }),

    RegistrationModule,

  ],

})

export class AppModule {}