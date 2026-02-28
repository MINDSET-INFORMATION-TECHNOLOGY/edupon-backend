# EduPons Backend PRD

Version: 1.0  
Date: February 28, 2026  
Owner: Backend Engineering

## 1. Product Context
EduPons is a role-based platform for Students, Educators, and Companies.  
The backend provides identity, profile, challenge, sponsorship, and analytics APIs that power all frontend experiences.

## 2. Backend Objective
Build a production-ready backend that is:
- Secure and role-aware
- Fast and scalable for MVP traffic
- Observable in production
- Easy to evolve in a monolithic architecture

## 3. Core Technology Decisions
- Backend language/framework: **NestJS (TypeScript)**
- Database: **PostgreSQL**
- ORM: **Prisma**
- Architecture style: **Modular Monolith** (not microservices)
- API protocol: REST + OpenAPI (Swagger)
- Authentication: JWT access tokens
- File storage/upload: **AWS S3** (profile/media uploads)
- Logging: **Pino** structured logs
- Production delivery alerts: **Slack notifications on production pushes/deployments**

## 4. User Roles and Access
- Student
  - Register/login, verify OTP, manage profile, submit to challenges
- Educator
  - Register/login, create/manage challenges, review submissions
- Company
  - Register/login, manage sponsorship/internship opportunities
- Admin (future)
  - Moderation, operational controls, role correction

## 5. In-Scope Functional Requirements (MVP)
### 5.1 Authentication and Identity
- Role-based registration with validation per role
- Email/password login
- JWT token issuance
- OAuth callback support (Google, LinkedIn)
- OTP request and verification
- Logout endpoint

### 5.2 User Profile
- Profile data stored and returned by role
- Public-safe user response model
- Role-driven required fields
- Profile/media upload flow using S3 (upload + retrieval URL)

### 5.3 File Uploads (S3)
- Backend issues secure upload strategy (prefer presigned upload flow)
- Store resulting S3 object URL/key in user profile metadata
- Enforce file type and size validation before accepting metadata
- Support upload use-cases for avatar and future challenge attachments

### 5.3 Challenge Foundation
- Challenge endpoints scaffold and domain model readiness
- Submission and review lifecycle planned as next API module

### 5.4 API Documentation
- Swagger docs for request and response bodies
- OneOf role-specific register request schemas
- Bearer auth scheme available in Swagger UI

## 6. Out of Scope (Current MVP Phase)
- Full internship workflow
- Full sponsorship analytics
- Advanced recommendation/ranking engine
- Microservices split

## 7. Data Model Requirements
Current core entities:
- `User`
- `AuthProvider`
- `UserOtp`

Current profile model:
- `User.profile` JSON stores identity/profile fields
- Includes role-specific fields (`institution`, `industry`, `company_email`)

Data integrity rules:
- Enforce role-specific required fields in service validation
- Keep email normalized (lowercase)
- Hash passwords and OTP codes with bcrypt

Planned normalization (post-MVP):
- Move identity-critical fields from JSON to typed columns
- Add indexed tables for challenges, submissions, sponsorships, notifications, analytics

## 8. API Contract Requirements
### Register
- Must support Student, Educator, Company request bodies
- Role-specific fields shown separately in Swagger via `oneOf`

### Login
- Response body must return only:
  - `role`
  - `token` (JWT)

### OAuth callback
- Returns authenticated session payload with JWT

### Protected endpoints
- Use Bearer JWT in `Authorization` header

### File Upload Endpoints
- Provide S3-compatible upload contract for client uploads
- Persist uploaded asset reference in PostgreSQL via Prisma

## 9. Security Requirements
- JWT signed with secret from env (`JWT_ACCESS_SECRET` fallback to `JWT_SECRET`)
- Throttling enabled for auth-sensitive endpoints
- Input validation with `class-validator`
- No sensitive data in response payloads
- No secrets in logs
- S3 access keys and bucket config must come from secure env vars
- Use least-privilege IAM policy for upload permissions

## 10. Logging and Observability
### 10.1 Logging Standard
- Use **Pino** as backend logger
- JSON structured logs in all environments
- Include request context IDs where available

### 10.2 Operational Metrics
- Auth success/failure rates
- OTP request/verification rates
- 4xx/5xx error trends
- Endpoint latency (p95, p99)

### 10.3 Alerting
- Alert on high auth failures, high 5xx rates, and deployment failures

## 11. CI/CD and Production Push Notifications
- On every production push/deploy:
  - Send message to Slack channel
  - Include commit SHA, actor, environment, status, timestamp
- On failure:
  - Immediate Slack alert for incident response

## 12. Non-Functional Requirements
- Performance: primary auth endpoints respond under 3s at MVP load
- Availability target: 99.9%
- Scalability: horizontal-ready monolith deployment
- Maintainability: module boundaries and clear service responsibilities

## 13. Test Strategy
- Unit tests for auth service/controller
- E2E tests for register/login/oauth routes
- Integration checks for S3 upload contract (or presigned URL generation)
- Type checks in CI
- Contract stability through Swagger verification

## 14. Risks and Mitigation
- Risk: profile JSON complexity grows
  - Mitigation: planned schema normalization roadmap
- Risk: auth abuse and brute-force attempts
  - Mitigation: throttling, OTP constraints, monitoring
- Risk: deployment blind spots
  - Mitigation: Pino logs + Slack deploy alerts
- Risk: insecure or oversized file uploads
  - Mitigation: MIME/size validation + S3 policy restrictions + key naming rules

## 15. Definition of Done (Backend MVP)
- Register/login/oauth/otp flows stable and tested
- Login returns `{ role, token }`
- Swagger docs accurate for request/response contracts
- Bearer auth schema configured in Swagger
- Prisma migrations synced and database up to date
- S3 upload flow documented and validated (avatar upload path)
- Slack production push notifications configured
- Pino logging integrated and verified in runtime
