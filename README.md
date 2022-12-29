# AuthService

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
