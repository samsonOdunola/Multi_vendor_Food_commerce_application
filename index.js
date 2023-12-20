const syncDb = require('./db_sync/db_relationship');
const App = require('./app');
require('dotenv').config();
const sequelize = require('./config/mysql.config');
// eslint-disable-next-line no-unused-vars
const { initPermission, initRoles } = require('./db_sync/createInitialValues');

const port = process.env.PORT || 5000;

const connectDb = async () => {
  try {
    syncDb();

    await sequelize.sync();
    await initRoles();
    // await initPermission();

    console.log('Database connected');
    App.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectDb();
