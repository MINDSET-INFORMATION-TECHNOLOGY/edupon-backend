# EduPons Backend MVP Execution Plan

Version: 1.0  
Date: February 28, 2026  
Scope: Backend MVP Delivery

## 1. MVP Goal
Deliver a production-ready backend baseline that supports:
- Role-based registration (Student, Educator, Company)
- Login with JWT token issuance
- OAuth provider URL + callback authentication
- OTP request and verification
- S3-based file upload flow for profile/avatar assets
- Swagger-first API documentation and testability

## 2. Technology Baseline
- NestJS (TypeScript)
- PostgreSQL
- Prisma ORM
- Modular monolith architecture
- AWS S3 for file uploads
- Pino logging
- Slack production push/deployment notifications

## 3. Delivery Streams
### Stream A: Auth and Identity
- Register endpoint with role-specific validation
- Login endpoint returning `{ role, token }`
- JWT signing and strategy validation
- OAuth callback flow integration
- OTP workflows

### Stream B: Data and Migration
- Prisma schema governance
- Migration reliability and reset/playbook
- Environment consistency across local/staging/prod

### Stream C: File Upload and Storage
- S3 bucket configuration and env wiring
- Upload contract (prefer presigned upload flow)
- Asset reference persistence in PostgreSQL via Prisma

### Stream D: API and Documentation
- Swagger request/response parity
- OneOf register request schemas by role
- Bearer auth schema in OpenAPI docs

### Stream E: Observability and Operations
- Pino structured logs
- Error and request tracing standards
- Slack notifications for production pushes/deployments

## 4. Work Breakdown by Phase
## Phase 1: Foundation (Week 1)
Deliverables:
- App bootstrap, validation pipeline, global prefix
- Prisma connection baseline
- Auth module skeleton

Exit criteria:
- Service boots cleanly
- DB connectivity verified

## Phase 2: Authentication Core (Week 2)
Deliverables:
- Register + login flows complete
- JWT generation and verification strategy in place
- Throttling for auth endpoints

Exit criteria:
- Unit tests pass for service/controller auth logic
- Manual API verification for register/login success and error cases

## Phase 3: Verification and Social Login (Week 3)
Deliverables:
- OTP request/verify endpoints complete
- OAuth URL and callback for Google/LinkedIn
- S3 upload endpoint/contract baseline for avatar uploads

Exit criteria:
- E2E tests pass for auth routes
- Callback contract validated
- S3 upload flow validated with test asset

## Phase 4: API Documentation and Contracts (Week 4)
Deliverables:
- Register oneOf role schemas documented
- Login response standardized to `{ role, token }`
- Swagger bearer auth schema configured

Exit criteria:
- Swagger UI matches live API behavior
- Request/response examples are accurate

## Phase 5: Operational Readiness (Week 5)
Deliverables:
- Pino integration and log format standards
- Deployment alert flow to Slack
- Error/latency monitoring checklist
- S3 access/security configuration review (IAM + bucket policy)

Exit criteria:
- Production push alert test message seen in Slack
- Logs contain expected structured fields

## 5. Acceptance Criteria (MVP)
- Register works for all three roles with validation rules
- Login returns role + JWT token only
- JWT-protected endpoint validates Bearer token
- OAuth endpoints return expected auth payload
- OTP endpoint behavior validated
- S3 upload flow works and saves asset reference correctly
- `npm run type-check` passes
- Auth unit and e2e tests pass

## 6. Testing Plan
- Unit:
  - `auth.service.spec.ts`
  - `auth.controller.spec.ts`
- E2E:
  - `test/auth.e2e-spec.ts`
- Manual API smoke:
  - Register (all roles)
  - Login (valid/invalid)
  - OAuth provider URL endpoints
  - S3 upload contract flow

## 7. Risk Register
- Swagger drift from runtime behavior
  - Mitigation: update docs in same PR as contract changes
- Prisma generated runtime mismatch
  - Mitigation: regenerate client and verify generated internal runtime files
- Auth regressions during response-shape changes
  - Mitigation: contract tests + live endpoint checks
- Missing production observability
  - Mitigation: Pino + deployment Slack notifications as release gate
- Risk: file upload abuse or wrong content types
  - Mitigation: file validation + S3 constraints + access policy hardening

## 8. Ownership
- Backend Engineers: API and service logic
- QA/Developer: test and e2e validation
- DevOps: production deployment flow + Slack notifications
- Product/Tech Lead: scope and acceptance sign-off

## 9. Release Checklist
- Migrations applied and status clean
- Type-check and tests green
- Swagger docs updated and reviewed
- S3 upload flow tested and documented
- Pino logging enabled
- Slack production push notification verified
- Rollback notes documented
