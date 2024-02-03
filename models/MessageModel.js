import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = model("Message", messageSchema);

export default Message;
