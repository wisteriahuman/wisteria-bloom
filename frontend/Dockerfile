FROM node:22.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

COPY . .

EXPOSE 3000

CMD ["pnpm", "next", "dev"]