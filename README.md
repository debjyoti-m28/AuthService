# Welcome to Auth Service for Airline management backend

### Setting up sequelize and sequelize-cli

- run `yarn add mysql2` and `yarn add sequelize sequelize-cli`
- Creating files
  - run `yarn sequelize init`
  - creates config, models, migrations and seeders folder
  - In config.json in `development` change the db `password` and give `database` name
- Create database
  - run `yarn sequelize db:create`
- Generate model
  - run `yarn sequelize model:generate --name User --attributes email:string,password:string`
- Migration of model
  - run `yarn sequelize db:migrate`

### Database relation

- A user can have multiple roles and one role can belong to multiple users (many to many)

  - generate a Role model which will contain the name of the role for each user
    - run `yarn sequelize model:generate --name Role --attributes name:string`
    - we already have User model created
  - Sync detabases to perform joins

    ```
    const db = require("./models/index");

    if(process.env.DB_SYNC) {
        db.sequelize.sync({alter: true});
    }
    ```

### Seeding dummy data

- Generate data for `Role` table
  - run `yarn sequelize seed:generate --name add-roles`
  - specify the Table name (`Roles`) in the newly generated seeders file and put dummy data
- Seed dummy data into `Role' table
  - run ` yarn sequelize db:seed --seed 20221230072846-add-roles.js` to seed a particular table data, otherwise run ` yarn sequelize db:seed:all`
