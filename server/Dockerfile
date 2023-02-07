#syntax=docker/dockerfile:1
FROM node:12.22.9-alpine
ENV NODE_ENV = production
WORKDIR /server
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install nodemon
RUN npm install --production
COPY . .