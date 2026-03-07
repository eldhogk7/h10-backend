---
description: Fix missing dependencies and generate Prisma client
---

1. Install required npm packages:
```bash
npm install @nestjs/common @nestjs/core @nestjs/platform-express @nestjs/mapped-types class-validator class-transformer pg @prisma/client
```
// turbo
2. Install development type definitions:
```bash
npm install -D @types/node @types/express @types/multer
```
// turbo
3. Generate Prisma client:
```bash
npx prisma generate
```
// turbo
4. Restart the NestJS development server:
```bash
npm run start:dev
```
// turbo
