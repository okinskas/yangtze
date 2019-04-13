FROM node:8-alpine

WORKDIR /usr/app

COPY package.json .

RUN apk add --no-cache git && \
    npm install --quiet

COPY . .
