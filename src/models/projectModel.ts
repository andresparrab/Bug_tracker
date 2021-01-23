import moongose from "mongoose";
import BugModel from "./bugModel";
// import BugSchema from "./bugModel";

const ModelSchema = new moongose.Schema(
  {
    projectName: {
      type: String,
      unique: true,
      required: true,
    },
    owner: {
      type: String,
      required: false,
    },
    users: [
      {
        type: moongose.Schema.Types.ObjectId,
        ref: "user",
        unique: false,
        required: false,
      },
    ],

    bugslist: [
      {
        type: moongose.Schema.Types.ObjectId,
        ref: "bugs",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProjectModel = moongose.model("projects", ModelSchema);

export default ProjectModel;
