# Authentication Backend

Backend for the Authentication

### Setup
Install nodejs and mysql.

Create database
```
node_modules/.bin/sequelize db:create
```

Migrate db to the running service
```
npm run migrate
```

Install pm2:
```
sudo npm install -g pm2
```

Set the following variables in a file called `.env` at the project root:
```
MYSQL_HOST=
MYSQL_DATABASE=
MYSQL_USERNAME=
MYSQL_PASSWORD=
MAILGUN_PUBLIC=
MAILGUN_PRIVATE=
FRONTEND_BASE_URL=
```

Start the server:
```
# Staging
sudo pm2 start --env staging pm2.json

# Production
sudo pm2 start --env production pm2.json
```

Restart the server:

```
sudo pm2 restart XXX-backend
```
