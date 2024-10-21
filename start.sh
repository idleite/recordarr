#!/bin/sh

# Ensure Prisma migrations are applied to the production database
npx prisma migrate deploy

# Start the application
npm run start
