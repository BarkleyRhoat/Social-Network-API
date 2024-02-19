// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/socialMediaDB')

// module.exports = mongoose.connection; 
const { connect, connection } = require('mongoose');
// const seed = require('./seeds');

const connectionString = 'mongodb://127.0.0.1:27017/socialMediaDB'; // Replace with your actual connection string

// Connect to MongoDB
connect(connectionString, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Connection successful
connection.on('connected', async () => {
  console.log(`Mongoose connected to ${connectionString}`);
//   await seed();
});

// Connection error
connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

// Connection disconnected
connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close the Mongoose connection when the Node process is terminated
process.on('SIGINT', () => {
  connection.close(() => {
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
});

// Export the Mongoose connection for use in other parts of the application
module.exports = connection;