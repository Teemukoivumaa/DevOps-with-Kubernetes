FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci && npm install

COPY . .

CMD ["npm", "start"]
