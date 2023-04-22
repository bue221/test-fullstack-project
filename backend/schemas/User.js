import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  balance: {
    type: Number,
    default: 0,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
});

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export const User = model("User", userSchema);
