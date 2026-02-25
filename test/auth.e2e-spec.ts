import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from '../src/auth/auth.service';

describe('Auth registration (e2e)', () => {
  let app: INestApplication;
  const fakeUser = {
    id: 'abc123',
    email: 'bob@example.com',
    fullname: 'Bob Builder',
    role: 'STUDENT',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue({
        create: jest.fn().mockResolvedValue(fakeUser),
      })
      .compile();

    app = moduleRef.createNestApplication();
    // replicate same pipes as main.ts
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/auth/register (POST) registers a user', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'bob@example.com',
        fullname: 'Bob Builder',
        password: 'secret987',
        role: 'STUDENT',
      })
      .expect(201)
      .expect(fakeUser);
  });

  it('returns 400 for invalid payload', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        email: 'not-an-email',
        fullname: '',
      })
      .expect(400);
  });
});
