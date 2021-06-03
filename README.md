<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="https://rokketlabs.com" target="blank"><img src="https://i.ibb.co/2tCfrV2/logo-rokket-cuadrado-negro.png" width="320" alt="Rokket Logo" border="0" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>. This template helps you start new applications, as used by <a href="https://rokketlabs.com" target="blank">Rokket Labs</a> &#128640;.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description and Features

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. It includes the following:

- Rokket Labs ESLint and Prettier preconfigured and ready to go!
- Dockerfile and Docker-Compose for easy deployment. Includes Terminus health checks for Kubernetes deployment.
- Express, Typegoose and GraphQL configuration out of the box.
- Socket.io (with Redis) and Email integration.
- Authentication (Passport and JWT) and Authorization (Roles and Guards) example.
- Working example with Users, Orders and Items, complete with schemas, tests and resolvers.
- Built with NestJS coding standards and suggestions.

## Installation

```bash
$ yarn
```

## Running the app

First, copy the `.env.example` file to `.env` and fill out your environment variables. Then, run the following commands:

```bash
# MongoDB and Redis
$ docker-compose up -d --build redis mongo

# Build and watch the server
$ yarn build

# On a different terminal window, run the server in development mode
$ yarn start

# or in production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## How to contribute

If you'd like to contribute to this template, your help is more than welcome! :feelsgood:

### Local testing

Fork this repository, clone it, and start a new app. After you tested your changes, create a PR to the `develop` branch.

### Pull requests and Issues

PR's and issues are a great contribution for us, and we'll get to them as fast as we (humanly :robot:) can. Please create your pull requests from your own fork, and if you're raising an issue, try to be as descriptive as possible so we can zap those pesky bugs :zap:.

## License

Nest is [MIT licensed](LICENSE).
