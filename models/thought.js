const mongoose = require('mongoose');

// Reaction schema for nested documents
const reactionSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  }
});

// Virtual to get the length of the reactions array in Thought model
reactionSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

// Virtual to get the length of the reactions array in Thought m
