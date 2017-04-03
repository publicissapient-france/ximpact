# X-Impact

[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![Coverage Status](https://coveralls.io/repos/github/xebia-france/ximpact/badge.svg?branch=master)](https://coveralls.io/github/xebia-france/ximpact?branch=master) [![Build Status](https://travis-ci.org/xebia-france/ximpact.svg?branch=master)](https://travis-ci.org/xebia-france/ximpact) [![Stories in Ready](https://badge.waffle.io/xebia-france/ximpact.png?label=ready&title=Ready)](http://waffle.io/xebia-france/ximpact)

# Contribute

### Yarn

```shell
brew update
brew install yarn
```

## Back

```shell
cd back
```

### Dependencies

```shell
yarn install
```

### Run

```shell
yarn run dev
```

### Lint

```shell
yarn run lint:watch
```

### Test

```shell
yarn run test
```

### Run local PostgreSQL

```shell
yarn run postgresql
```

### Create PostgreSQL tables

```shell
yarn run db:migrate:up
```

### Update dependencies

```shell
yarn run npm-check
```

### Regenerate GraphQL schema

```
yarn run graphql:update-schema
```

## Web

```shell
cd web
```

### Dependencies

```shell
yarn install
```

### Run

```shell
yarn run dev
```

### Build for production with minification

```shell
yarn run build
```

### Build for production and view the bundle analyzer report

```shell
yarn run build --report
```

### Run unit tests

```shell
yarn run unit
```

### Run e2e tests

```shell
yarn run e2e
```

### run all tests

```shell
yarn test
```