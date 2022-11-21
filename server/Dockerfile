FROM node:19-alpine AS development
ENV NODE_ENV development
WORKDIR /index
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
ENTRYPOINT [ "npm", "run", "dev" ] 