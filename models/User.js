const { Schema, model } = require("mongoose");

// create User schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //must match a valid email -- Mongoose matching validation
      match: [/.+\@.+\..+/],
    },
    // array of _id values ref the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // array of _id values ref the User model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create virtual called friendCount that retrieves the legnth of the user's friend's array field on query
UserSchema.virtual("friendCount").get(function () {
  return this.friends.legnth;
});

const User = model("User", UserSchema);

module.exports = User;
