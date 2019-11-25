#Michelle's News Project

https://nc-news-api-michelle.herokuapp.com/

This project is currently the backend for a news api, allowing access to articles, comments, users and topics.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

The first things to do is cloning the project. For this click the clone or download button and copy the path.

In your terminal select the path in which you would like to clone the project into. Here is an example of changing directory

```
cd Documents/northcoders
```

To get a list of folder contents you can use ls

```
ls

```

Once in the desired directory, paste in the path you copied from github.

```
git clone https://github.com/PATH
```

When the project has cloned you can open it in, for example, Visual Studio Code. You can for example use the command

```
code .
```

### Prerequisites

What things you need to install the software and how to install them

In your terminal type

```
npm install
```

This will install all dependencies the project requires. This includes knex, pg, express and fs.

To run tests on the data you will also need to install chai, chai-sorted, mocha and supertest. Do this by typing into the terminal:

```
npm i -D chai chai-sorted mocha supertest
```

### Installing

A guide to get the development environment set up

In the root create a file called knexfile.js. In this file add the following code:
The reason for this is X
it does THIS

```
const { DB_URL } = process.env;

const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "nc_news"
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };

### Setting up the database and running tests

In order to seed the database run the following command:

```

npm run setup-dbs

```

To run tests run the following:

```

npm test

```

### Minimum versions

To successfully run this code the minimum version of Node.js should be 12.9.1 and for Postgres 7.12.1
```
