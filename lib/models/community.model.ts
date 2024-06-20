import mongoose from "mongoose";

const Schema = mongoose.Schema;

const communitySchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: { type: String },
  bio: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread"
  },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  members: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  ]
});


const Community = mongoose.models.Community || mongoose.model("Community",communitySchema);

export default Community;