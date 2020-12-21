import moongose from "mongoose";

const UserSchema = new moongose.Schema({
  username: {
    type: String,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = moongose.model("user", UserSchema);

export default UserModel;
