# X-Impact

[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![Coverage Status](https://coveralls.io/repos/github/xebia-france/ximpact/badge.svg?branch=master)](https://coveralls.io/github/xebia-france/ximpact?branch=master) [![Build Status](https://travis-ci.org/xebia-france/ximpact.svg?branch=master)](https://travis-ci.org/xebia-france/ximpact) [![Stories in Ready](https://badge.waffle.io/xebia-france/ximpact.png?label=ready&title=Ready)](http://waffle.io/xebia-france/ximpact)

# Web

# Back

## Install dev environment

### Yarn

```shell
brew update
brew install yarn
```

### Dependencies

```shell
yarn install
```

## Run

```shell
yarn run dev
```

## Lint

```shell
yarn run lint:watch
```

## Test

```shell
yarn run test
```

## Start local Postgresql

```shell
yarn run postgresql
```

## Create Postgresql tables

```shell
yarn run db:migrate:up
```

## Update dependencies

```shell
yarn run npm-check
```

# Regenerate GraphQL schema

```
yarn run graphql:update-schema
```