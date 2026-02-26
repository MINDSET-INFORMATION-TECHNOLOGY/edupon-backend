import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { AuthProviderType } from '../src/generated/prisma/enums';

describe('Auth registration (e2e)', () => {
  let app: INestApplication;
  const fakeUser = {
    id: 'abc123',
    email: 'bob@example.com',
    fullname: 'Bob Builder',
    role: 'STUDENT',
  };
  const fakeGoogleAuthUrl = {
    url: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=test-google-client',
    state: 'google-state-123',
  };
  const fakeLinkedInAuthUrl = {
    url: 'https://www.linkedin.com/oauth/v2/authorization?client_id=test-linkedin-client',
    state: 'linkedin-state-456',
  };
  const fakeGoogleCallbackUser = {
    id: 1,
    email: 'google@example.com',
    fullname: 'Google User',
    role: 'STUDENT',
  };
  const fakeLinkedInCallbackUser = {
    id: 2,
    email: 'linkedin@example.com',
    fullname: 'LinkedIn User',
    role: 'STUDENT',
  };
  const fakeLoggedInUser = {
    id: 3,
    email: 'bob@example.com',
    fullname: 'Bob Builder',
    role: 'STUDENT',
  };
  const fakeLogoutResponse = {
    message: 'User logged out successfully',
  };
  const authServiceMock = {
    create: jest.fn().mockResolvedValue(fakeUser),
    login: jest.fn().mockResolvedValue(fakeLoggedInUser),
    logout: jest.fn().mockResolvedValue(fakeLogoutResponse),
    getProviderSignInUrl: jest.fn((provider: AuthProviderType) => {
      if (provider === AuthProviderType.GOOGLE) {
        return fakeGoogleAuthUrl;
      }
      return fakeLinkedInAuthUrl;
    }),
    signInWithProviderCallback: jest.fn((provider: AuthProviderType) => {
      if (provider === AuthProviderType.GOOGLE) {
        return Promise.resolve(fakeGoogleCallbackUser);
      }
      return Promise.resolve(fakeLinkedInCallbackUser);
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
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

  it('/api/register (POST) registers a user', () => {
    return request(app.getHttpServer())
      .post('/api/register')
      .send({
        email: 'bob@example.com',
        fullname: 'Bob Builder',
        password: 'secret987',
        role: 'STUDENT',
        institution: 'Test University',
        area_of_interest: 'Computer Science',
      })
      .expect(201)
      .expect(fakeUser);
  });

  it('returns 400 for invalid payload', () => {
    return request(app.getHttpServer())
      .post('/api/register')
      .send({
        email: 'not-an-email',
        fullname: '',
      })
      .expect(400);
  });

  it('/api/login (POST) allows up to 6 retries then returns 429', async () => {
    const payload = {
      email: 'bob@example.com',
      password: 'secret987',
    };

    for (let i = 0; i < 6; i += 1) {
      const response = await request(app.getHttpServer())
        .post('/api/login')
        .send(payload)
        .expect(201);
      expect(response.body).toEqual(fakeLoggedInUser);
    }

    await request(app.getHttpServer())
      .post('/api/login')
      .send(payload)
      .expect(429);
  });

  it('/api/logout (POST) revokes session token', () => {
    return request(app.getHttpServer())
      .post('/api/logout')
      .expect(201)
      .expect(fakeLogoutResponse);
  });

  it('/api/oauth/google (GET) returns Google auth URL', () => {
    return request(app.getHttpServer())
      .get('/api/oauth/google')
      .expect(200)
      .expect(fakeGoogleAuthUrl);
  });

  it('/api/oauth/linkedin (GET) returns LinkedIn auth URL', () => {
    return request(app.getHttpServer())
      .get('/api/oauth/linkedin')
      .expect(200)
      .expect(fakeLinkedInAuthUrl);
  });

  it('/api/oauth/google/callback (GET) handles Google callback', () => {
    return request(app.getHttpServer())
      .get('/api/oauth/google/callback')
      .query({
        code: 'google-code-123',
        scope: 'openid email profile',
        prompt: 'consent',
        authuser: '0',
      })
      .expect(200)
      .expect(fakeGoogleCallbackUser);
  });

  it('/api/oauth/linkedin/callback (GET) handles LinkedIn callback', () => {
    return request(app.getHttpServer())
      .get('/api/oauth/linkedin/callback')
      .query({
        code: 'linkedin-code-456',
        scope: 'openid profile email',
      })
      .expect(200)
      .expect(fakeLinkedInCallbackUser);
  });
});
