const mongoose = require('mongoose');
const usersSeed = require('./userSeeds');
const thoughtsSeed = require('./thoughtSeeds');
const reactionSchema = require('./reactionSchema');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/socialMediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the User model schema
const User = require('../models/user');

// Use the Thought model schema
const Thought = require('../models/thought');

// Use the Reaction model schema
const Reaction = mongoose.model('Reaction', reactionSchema);

// Function to seed users
async function seedUsers() {
  try {
    // Remove existing users
    await User.deleteMany({});
    // Insert seed users
    const createdUsers = await User.insertMany(usersSeed);
    console.log('Users seeded successfully:', createdUsers);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

// Function to seed thoughts
async function seedThoughts() {
  try {
    // Remove existing thoughts
    await Thought.deleteMany({});
    // Insert seed thoughts
    const createdThoughts = await Thought.insertMany(thoughtsSeed);
    console.log('Thoughts seeded successfully:', createdThoughts);
  } catch (error) {
    console.error('Error seeding thoughts:', error);
  }
}

// Function to close the database connection
function closeConnection() {
  mongoose.connection.close();
  console.log('Database connection closed.');
}

// Seed the database
async function seedDatabase() {
  await seedUsers();
  await seedThoughts();
  closeConnection();
}

// Run the seed script
seedDatabase();
