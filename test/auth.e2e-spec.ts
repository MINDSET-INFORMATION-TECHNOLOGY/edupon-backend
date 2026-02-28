import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import * as jwt from 'jsonwebtoken';
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
    user: {
      id: 1,
      email: 'google@example.com',
      fullname: 'Google User',
      role: 'STUDENT',
    },
    tokens: {
      token_type: 'Bearer',
      access_token: 'google-jwt-token',
      expires_in: 900,
    },
  };
  const fakeLinkedInCallbackUser = {
    user: {
      id: 2,
      email: 'linkedin@example.com',
      fullname: 'LinkedIn User',
      role: 'STUDENT',
    },
    tokens: {
      token_type: 'Bearer',
      access_token: 'linkedin-jwt-token',
      expires_in: 900,
    },
  };
  const fakeLoggedInUser = {
    role: 'STUDENT',
    token: 'login-jwt-token',
  };
  const fakeLogoutResponse = {
    message: 'User logged out successfully',
  };
  const fakeOtpRequestResponse = {
    message: 'OTP generated and sent successfully',
    expires_at: new Date('2026-02-28T10:00:00.000Z').toISOString(),
  };
  const fakeOtpVerifyResponse = {
    message: 'OTP verified successfully',
  };
  const fakeForgotPasswordResponse = {
    message: 'If an account exists with this email, a reset code has been sent',
  };
  const fakeResetPasswordResponse = {
    message: 'Password reset successfully',
  };
  const validAccessToken = jwt.sign(
    { sub: 1, email: 'bob@example.com', role: 'STUDENT' },
    'dev-jwt-secret',
    { expiresIn: '15m' },
  );
  const authServiceMock = {
    create: jest.fn().mockResolvedValue(fakeUser),
    login: jest.fn().mockResolvedValue(fakeLoggedInUser),
    logout: jest.fn().mockResolvedValue(fakeLogoutResponse),
    requestOtp: jest.fn().mockResolvedValue(fakeOtpRequestResponse),
    verifyOtp: jest.fn().mockResolvedValue(fakeOtpVerifyResponse),
    forgotPassword: jest.fn().mockResolvedValue(fakeForgotPasswordResponse),
    resetPassword: jest.fn().mockResolvedValue(fakeResetPasswordResponse),
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

  it('/api (GET) returns health text', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
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

  it('/api/me (GET) returns 401 without jwt', () => {
    return request(app.getHttpServer())
      .get('/api/me')
      .expect(401);
  });

  it('/api/me (GET) returns user with valid jwt', () => {
    return request(app.getHttpServer())
      .get('/api/me')
      .set('Authorization', `Bearer ${validAccessToken}`)
      .expect(200)
      .expect({
        userId: 1,
        email: 'bob@example.com',
        role: 'STUDENT',
      });
  });

  it('/api/logout (POST) returns 401 without jwt', () => {
    return request(app.getHttpServer())
      .post('/api/logout')
      .expect(401);
  });

  it('/api/logout (POST) revokes session with valid jwt', () => {
    return request(app.getHttpServer())
      .post('/api/logout')
      .set('Authorization', `Bearer ${validAccessToken}`)
      .expect(201)
      .expect(fakeLogoutResponse);
  });

  it('/api/otp/request (POST) sends otp', () => {
    return request(app.getHttpServer())
      .post('/api/otp/request')
      .send({
        email: 'bob@example.com',
      })
      .expect(201)
      .expect(fakeOtpRequestResponse);
  });

  it('/api/otp/verify (POST) verifies otp', () => {
    return request(app.getHttpServer())
      .post('/api/otp/verify')
      .send({
        otp: '123456',
      })
      .expect(201)
      .expect(fakeOtpVerifyResponse);
  });

  it('/api/password/forgot (POST) requests password reset', () => {
    return request(app.getHttpServer())
      .post('/api/password/forgot')
      .send({
        email: 'bob@example.com',
      })
      .expect(201)
      .expect(fakeForgotPasswordResponse);
  });

  it('/api/password/reset (POST) resets password', () => {
    return request(app.getHttpServer())
      .post('/api/password/reset')
      .send({
        email: 'bob@example.com',
        otp: '123456',
        new_password: 'newPassword123',
      })
      .expect(201)
      .expect(fakeResetPasswordResponse);
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

  it('/api/oauth/twitter (GET) rejects unsupported provider', () => {
    return request(app.getHttpServer())
      .get('/api/oauth/twitter')
      .expect(400);
  });
});
