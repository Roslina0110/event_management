import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
<<<<<<< HEAD
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL || '',   // your Netlify URL goes here via env var
    ].filter(Boolean),
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend running on port ${port}`);
}
bootstrap();
=======
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  });

  await app.listen(3000);
}
bootstrap();
>>>>>>> 46f457172239a81233c93f8bc57ef3946d8e8075
