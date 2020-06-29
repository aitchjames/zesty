const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
   console.log('UNHANDLER REJECTION! 🔥 Shutting down...');
   console.log(err.name, err.message);

   process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<dbname>', process.env.DATABASE_NAME);

mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
   })
   .then(() => console.log('DB connection successful!'));

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
   console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
   console.log('UNHANDLER REJECTION! 🔥 Shutting down...');
   console.log(err.name, err.message);
   server.close(() => {
      process.exit(1);
   });
});