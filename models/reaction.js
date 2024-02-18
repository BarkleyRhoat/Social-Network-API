// import necessary components from the mongoose library. Schema is used to define the structure of the document, and Types provides access to Mongoose's ObjectId data type.
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
      default: Date.now, // default value set to the current timestamp
      get: timestamp => new Date(timestamp).toLocaleString(), // getter method to format the timestamp on query
    },
  },
  {
    toJSON: { // specifies how the document should be transformed when converted to JSON. In this case, it enables getters
      getters: true,
    },
    id: false, // disables the inclusion of the default _id field in the document
  }
);

// export the reactionSchema so that it can be used as a subdocument schema in other parts of the application
module.exports = reactionSchema; 
