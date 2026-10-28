FROM node:24-alpine

WORKDIR /app/backend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run prisma:generate && npm run build

CMD ["sh", "-c", "npm run migrate:deploy && npm start"]