FROM node:14-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "deploy"]
