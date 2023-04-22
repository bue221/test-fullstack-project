import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  amount: Number,
  date: Date,
  type: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

transactionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Transaction = model("Transaction", transactionSchema);
