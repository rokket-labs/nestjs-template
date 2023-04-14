FROM node:18-alpine

RUN npm i -g pnpm@8.2.0

COPY . .

RUN pnpm i

EXPOSE 3000

RUN pnpm build

CMD ["pnpm", "start:prod"]
