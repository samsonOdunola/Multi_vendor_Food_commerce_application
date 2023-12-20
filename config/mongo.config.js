require('dotenv').config();

const mongoUri = process.env.MONGO_URL;

const options = {
  autoIndex: true,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { mongoUri, options };
