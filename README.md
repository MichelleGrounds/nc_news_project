#Michelle's News Project

https://nc-news-api-michelle.herokuapp.com/

This project is the backend for a news api, allowing access to articles, comments, users and topics.


### Prerequisites

In order to run this project, the following prerequisites are required to be installed globally:

| Dependency | Version |
| ---------- | ------- |
| PostgreSQL | 12.1    |
| Node.JS    | 12.9.1  |
| NPM        | 6.10.3  |

The following developer dependencies will need to be installed:

| Dependency    | Version |
| ------------- | ------- |
| Express       | 4.17.1  |
| Knex          | 0.20.2  |
| Node Postgres | 7.12.1  |
| Chai          | 4.2.0   |
| Chai-Sorted   | 0.2.0   |
| Mocha         | 6.2.2   |
| Supertest     | 4.0.2   |


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

### Installing

This section details the steps to get the development environment up and running. 


Step 1: Clone the repository with the command: 

```
$ git clone https://github.com/Baileex/be-nc-news-v2
```

Step 2: Open the repository in your preferred code editor e.g VSCode, Atom etc

Step 3: Navigate into the cloned repository, install the dependencies using the terminal command:

```
npm i
```

Step 4: Create a local `knexfile.js` file in the main directory and insert the below code:

```const { DB_URL } = process.env;
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
    connection: `${DB_URL}?ssl=true`,
  },
  development: {
    connection: {
      database: "nc_news"
      // username: only applicable if Linux User,
      // password: only applicable if Linux User 
    }
  },
  test: {
    connection: {
      database: "nc_news_test"
      // username: only applicable if Linux User,
      // password: only applicable if Linux User
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

NB: postGreSQL will require a username and password if you are running a linux system. If you are running on Mac OSX, you can remove the username and password keys from both development and test.

Step 5: Run the following terminal commands to set up your local test and development databases:

```
$ npm run setup-dbs
$ npm run seed
```

To see your databases you can run the command:

```
$ psql
\c nc_news_test
```

or 

```
$ psql -f queries.sql > output.txt

```

The above command with create an .txt file, displaying the tables and the data inserted.

## Running the tests

To test the endpoints locally and ensure that everything has been configured correctly use the command:

```
$ npm t
```
