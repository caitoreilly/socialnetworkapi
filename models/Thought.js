const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Create Reaction (schema only)
// Not a model, but will be used as the reaction field's subdocument schema in the Thought model below
const ReactionSchema = new Schema(
  {
    reactionId: {
      // Use Mongoose's ObjectId data type
      type: Schema.Types.ObjectId,
      // Default value is set to a new ObjectId
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
      // Set default value to current timestamp
      default: Date.now,
      // Use a getter method to format timestamp on query
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create Thought model schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use a getter method to format the timestamp on query
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    // array of nested documents created with the reactionSchema
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
