FROM mhart/alpine-node:latest

RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk

RUN mkdir -p /home/node/app

RUN addgroup -S node \
  && adduser -S -D -h /home/node node node \
  && chown -R node:node /home/node
USER node

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

RUN yarn prebuild && yarn build

CMD ["yarn", "start:prod"]
