import moongose from "mongoose";

const ActivitiesSchema = new moongose.Schema(
  {
    text: {
      type: Number,
      unique: true,
    },
    projectdId: {
      type: String,
      unique: true,
      required: false,
    },
    bugId: {
      type: String,
      unique: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ActivitiesModel = moongose.model("projects", ActivitiesSchema);

export default ActivitiesModel;
