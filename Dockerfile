# Stage 1: Build the application
FROM node:22-slim AS build
# Install OpenSSL
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code and build it
COPY . .
RUN npx prisma migrate reset --force
RUN npm run build

# Stage 2: Run the application
FROM node:22-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/prisma ./prisma
RUN npx prisma generate
# Copy the built application from the build stage
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/start.sh ./start.sh

EXPOSE 3000

CMD ["/bin/sh", "./start.sh"]

