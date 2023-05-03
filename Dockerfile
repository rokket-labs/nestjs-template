FROM node:18-alpine as ts-compiler
WORKDIR /usr/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node tsconfig*.json ./
RUN npm i -g pnpm@8.3.1
RUN pnpm i --frozen-lockfile --ignore-scripts
USER node

FROM node:18-alpine as ts-builder
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/. ./
COPY --chown=node:node . ./
RUN npm i -g pnpm@8.3.1
RUN pnpm run build
ENV NODE_ENV production
RUN pnpm i -P --frozen-lockfile --ignore-scripts
USER node

FROM gcr.io/distroless/nodejs:18
WORKDIR /usr/app
COPY --chown=node:node --from=ts-builder /usr/app/node_modules ./node_modules
COPY --chown=node:node --from=ts-builder /usr/app/dist ./dist
CMD ["dist/main.js"]