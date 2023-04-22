import { Schema, model } from "mongoose";

const profileSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  avatarUrl: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

profileSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Profile = model("Profile", profileSchema);
