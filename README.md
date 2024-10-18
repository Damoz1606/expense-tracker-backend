# Expense Tracker Backend

This is a [Nest.js](http://nestjs.com) project.

## Local Installation

#### System requirements

| Technology | Version  |
| ---------- | -------- |
| Node       | ^18.17.1 |
| Postgres   | ^15      |

#### Enviroment

This project uses a .env file, so create a `.env` file in the root of the project and add the following structure:

```bash
DATABASE_URL=database_url

PORT=application_port # eg. 3000
NODE_ENV=development

EMAIL_VALIDATION=path_where_user_validate_credentials # eg. https://frontend.com/validate

JWT_SECRET=jwt_secret
JWT_EXPIRATION=time_in_miliseconds # eg. 86400 (1 day)


SMTP_HOST=smpt_host # eg. smtp.your_domain.com
SMTP_PORT=smpt_port # eg. 465
SMTP_SECURE=true # Change it to false if the connection is not secure
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_APP_NAME=app_name
SMTP_APP_MAIL=smpt_sender_mail
```

#### Installation

Let's run this application as a local server. To achive that you must:

1. Install Node
2. Install npm, yarn, pnpm or bun (By preference pnpm)
3. Clone the repository
4. Install dependencies by running:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

5. Run the development server:

```bash
npm run start:dev
# or
yarn start:dev
# or
pnpm start:dev
# or
bun start:dev
```

After the system is running, open [http://localhost:3000](http://localhost:3000) in your browser to see the result. In the above example the .env file is supposed to be using port 3000.

#### Is really online?

To make sure that the system is running without problems check the logs or go to the browser and navigate to [http://localhost:3000/docs](http://localhost:3000/docs), this will open the Swagger documentation.

## Web deployment

Open [https://expense-tracker-backend-kbea.onrender.com/docs](https://expense-tracker-backend-kbea.onrender.com/docs) in your browser to see the result on the web.

## Documentation

By default this project uses JSDoc, so if you open it in VsCode and call a function you'll see a description of it.

Also, this project was made using Swagger, so if you open [http://localhost:3000/docs](http://localhost:3000/docs), there you'll see the documentation for each enpoint. Note that most of them requires a JWT token, so first you must need to be logged.

## External Libraries

This system used external libraries to work.

### Prisma

This ORM is a useful tool to connect the application with the database. Also, help to create the migrations and apply them in the database.

### Nodemailer

Connects the application with an smtp server, so the application can send emails to any registered user.

### Pino

Is logger that make things a kind a faster thank of its lighter nature.

### Uuid

Create random string values

### Passwort

Allow the local authentication strategy and the jwt authorization.
