FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "npm", "start" ]
