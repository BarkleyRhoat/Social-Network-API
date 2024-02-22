const { Schema, Types } = require('mongoose'); 

// Reaction Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // default value 
      get: timestamp => new Date(timestamp).toLocaleString(),
    },
  },
  {
    toJSON: { 
      getters: true,
    },
    id: false, 
  }
);

// export the reactionSchema so that it can be used as a subdocument schema in other parts of the application
module.exports = reactionSchema; 
