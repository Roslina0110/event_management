import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
=======
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationModule } from './registration/registration.module';

@Module({
<<<<<<< HEAD
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),

    RegistrationModule,
  ],
})
export class AppModule {}
=======

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
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
