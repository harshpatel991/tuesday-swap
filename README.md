# Tuesday Swap
Tuesday Swap allows users of the T-Mobile Tuesdays rewards program to swap rewards they have earned. 
In order to prevent scams, Tuesday Swap requires that users verify ownership of a Reddit account that is older than 3 months. 

![alt text](https://i.imgur.com/6QNQNpj.png "WIP")

## Technical
- React frontend
- Node/Express backend
- PostgreSQL
- Bookshelf ORM
- OAuth2 Reddit Verification

## Development
### Running development server
Start serving react files on port 3000 and Express on port 3001.
```shell
npm run start-dev
```

`nginx.conf` should be placed in `/usr/local/etc/nginx/nginx.conf` this will proxy requests on port 8080 to the servers running on 3000 and 3001

Visit `http://localhost:8080/`

### Running database migrations and seeds
```shell
knex migrate:latest
seed:run
```

### Running tests
```shell
mocha
```