ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /app

COPY package.json yarn.lock
RUN yarn install

COPY . /app

RUN yarn build
ENTRYPOINT yarn start