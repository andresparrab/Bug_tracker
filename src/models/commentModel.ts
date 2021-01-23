import moongose from "mongoose";

const CommentSchema = new moongose.Schema(
  {
    bugId: {
      type: String,
    },
    userId: {
      type: String,
    },
    text: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CommentModel = moongose.model("comments", CommentSchema);

export default CommentModel;
