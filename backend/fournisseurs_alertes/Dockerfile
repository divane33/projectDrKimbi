FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY . .

RUN npm install

EXPOSE 8001

CMD ["node", "server.js"]