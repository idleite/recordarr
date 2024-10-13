# Stage 1: Build the application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma migrate 
RUN npm run build

# Stage 2: Run the application
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./

EXPOSE 3000

CMD ["npm", "run", "start"]
