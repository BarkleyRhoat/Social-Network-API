const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // You can adjust the email validation regex as needed
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought' // Assuming there is a 'Thought' model
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Assuming the same model is used for friends
    }
  ]
});

const User = mongoose.model('User', userSchema);

const user = await User.findOne({ /* your query criteria */ }).populate('friends');

console.log(user.friendCount); // This will give you the length of the friends array


module.exports = User;
