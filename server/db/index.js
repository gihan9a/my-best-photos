const mongoose = require('mongoose');

// mongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Connect to mongoDB server
 *
 * @returns
 */
const connect = () => mongoose.connect(process.env.MONGODB_URI, options);

module.exports = {
  options,
  connect,
  disconnect: mongoose.disconnect,
};
