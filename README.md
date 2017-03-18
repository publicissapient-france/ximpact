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

## Start local DynamoDB

```shell
yarn run dynamo
```

> You can open shell at http://localhost:8000/shell/

## Create DynamoDB tables

```shell
yarn run db:create
```

## Update dependencies

```shell
yarn run npm-check
```

# Regenerate GraphQL schema

```
query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      subscriptionType { name }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }
  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
    defaultValue
  }
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
```