# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine AS frontend-builder

WORKDIR /app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

RUN yarn install

CMD ["yarn", "start"]
