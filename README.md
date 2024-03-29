# generous-recipe-service
Full API Doc: [DOCUMENTATION](https://documenter.getpostman.com/view/6786432/UV5WEeAb) 📖

## What's going on here?

- [Features Checklist ✅](#features-checklist-)
- [Stack used 🥞](#stack-used-)
- [Before Run ☕️](#before-run-%EF%B8%8F)
    * [Clone Repo 💾](#clone-repo-)
    * [Environtment Variable Setup 🛠](#environtment-variable-setup-)
    * [Database Setup ⚙️](#database-setup-%EF%B8%8F)
- [How to Run 👟](#how-to-run-)
    * [Run Locally 🏃](#run-locally-)
    * [Debugging 🕵️‍♂️](#debugging-%EF%B8%8F%EF%B8%8F)
    * [Dockering 🐳](#dockering-)
    * [Health Check 🇨🇭](#health-check-)
- [How to Use 💻](#how-to-use-)
    * [List of recipes 🍱](#list-of-recipes-)
    * [Add new recipe 👨🏻‍🍳](#add-new-recipe-)
    * [Add new ingredient 🧂](#add-new-ingredient-)
    * [Add new step for recipe 🍳](#add-new-step-for-recipe-)
    * [Success Response Schema 🍀](#success-response-schema-)
    * [Error Response Schema ☢️](#error-response-schema-%EF%B8%8F)

## Features Checklist ✅

- [x] Using framework 📜
    - [x] MoleculerJS is the choosen one 🥂
- [x] API list of recipes 🍱
    - [x] Paginating 📃
    - [x] Sorting 📈
    - [x] Field querying 🌱
- [x] API to add new recipe 👨🏻‍🍳
- [x] API to add new ingredient 🧂
- [x] API to add new step for recipe (1 step) 🧪

## Stack used 🥞

- SQLite3
- TypeScript
- MoleculerJS
- TypeORM

## Before Run ☕️

❗️ Tutorial on this page will cover the step by using `yarn`. If you are using `npm`, please make sure you replace all `yarn` command by `npm run`.

### Clone Repo 💾

Clone this repo using `Download` button or bash 👨‍💻

```bash
$ git clone https://github.com/hrz8/generous-recipe-service.git
```

### Environtment Variable Setup 🛠

Required to create `.env` file for the development purpose, can refer the `.env.sample` file. Create `.env` file for development purpose by this command below:

```bash
$ cd generous-recipe-service
$ touch .env
```

If the environment variable not setup, it will cover by default value using the `env-var` library.

| Environtment Variable      | Description |
| -------------------------- | ----------- |
| RESTFUL_PORT               | will be the port of the Restful API server which will serve the services/API. Default = `3000`       |
| RESTFUL_PATH               | will be the prefix of the server's URL. Example: `https://host.com{RESTFUL_PATH}/v1/some-app/`. The default will be `/api`.        |

`.env` file should be look like this:

```
RESTFUL_PORT=3000
RESTFUL_PATH=/api
```

### Database Setup ⚙️

Run the migration to create and set all tables and also some seeds data for your `sqlite` database by run this commands:

```bash
$ yarn db:sync
$ yarn db:migrate
```

Commands above will create the `db.sqlite` file in `./database/db.sqlite`. Picture below is the Diagram of database used.

![recipe db diagram](db_diagram.png "DB Diagram")

## How to Run 👟

### Run Locally 🏃

This command below will compiling the `Typescript` at the first and run the server right after that.

```bash
$ yarn start
```

It will running in the host with the port given `http://host:{RESTFUL_PORT}`.

### Debugging 🕵️‍♂️

Debug app using VsCode Debugger Tool

- Select your debugger to be set as `Launch Debug 🕵️‍♂️`
- Press `F5` to run the debugging
- Done!

### Dockering 🐳

- Image Builds (Example)

```bash
$ yarn dc:build
# make sure docker image already registered
$ docker image ls
$ docker create --name recipe-app -e RESTFUL_PORT=3100 -e RESTFUL_PATH=/api -p 3100:3100 generous-recipe-service:1.0
$ docker start recipe-app
# see the logs of the app
$ docker logs recipe-app -f
# health check
$ curl http://{{docker_host}}:3100/api/health-check
```

- Docker Compose (Example)

```bash
$ yarn dc:up
# see the logs of the app
$ yarn dc:logs
# health check
$ curl http://{{docker_host}}:3111/api/health-check
# stop
$ yarn dc:down
```

### Health Check 🇨🇭

```bash
$ curl http://{{docker_host}}:{{RESTFUL_PORT}}/api/health-check
```

## How to Use 💻

This application based on RESTful API, so the usage will required to do the HTTP request to each available endpoint below. Full Documentation of how to use each endpoint is in the link right here: [DOCUMENTATION](https://documenter.getpostman.com/view/6786432/UV5WEeAb) 📖

### List of recipes 🍱

Endpoint:

| Method | URI                                     |
|--------|-----------------------------------------|
| **GET**    | _{{host}}{{RESTFUL_PATH}}_**/recipe** |

### Add new recipe 👨🏻‍🍳

Endpoint:

| Method | URI                                     |
|--------|-----------------------------------------|
| **POST**    | _{{host}}{{RESTFUL_PATH}}_**/recipe** |

### Add new ingredient 🧂

Endpoint:

| Method | URI                                     |
|--------|-----------------------------------------|
| **POST**    | _{{host}}{{RESTFUL_PATH}}_**/ingredient** |

### Add new step for recipe 🍳

Endpoint:

| Method | URI                                     |
|--------|-----------------------------------------|
| **POST**    | _{{host}}{{RESTFUL_PATH}}_**/recipe/step** |


### Success Response Schema 🍀

```json
{
    "message": "success message",
    "code": 200,
    "apiVersion": "v1",
    "error": null,
    "result": {
        "foo": "bar"
    },
    "meta": {}
}
```

### Error Response Schema ☢️

```json
{
    "message": "error message",
    "code": 400,
    "apiVersion": "v1",
    "error": {
        "name": "ErrorName",
        "type": "ERROR_TYPE",
        "data": {
            "foo": "bar"
        }
    },
    "result": null,
    "meta": {}
}
```

## Test 🧪

Test health service

```bash
$ yarn test
```


## Author ℹ️

Hirzi Nurfakhrian
