const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoMemoryServer } = require('mongodb-memory-server');

const { options } = require('../db');

const mongod = new MongoMemoryServer();

/**
 * Establish the connection
 */
module.exports.connect = async () => {
  const uri = await mongod.getUri();
  await mongoose.connect(uri, options);
};

/**
 * close the connection
 */
module.exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};
