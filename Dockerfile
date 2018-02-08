FROM node:8

LABEL maintainer="Christophe Coquelet <christophe.coquelet@link-value.fr>"

EXPOSE 3000

EXPOSE 3001

RUN mkdir -p /usr/src/app

WORKDIR /usr/src

ADD package.json package.json

RUN npm install --silent

ENV PATH /usr/src/node_modules/.bin:$PATH

WORKDIR /usr/src/app

ADD . .

RUN npm run build

ENTRYPOINT npm run start:prod
