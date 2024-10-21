#!/bin/sh

echo "Starting Prisma migration..."
npx prisma migrate deploy

echo "Starting the app..."
npm run start
