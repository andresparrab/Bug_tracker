import moongose from "mongoose";

const BugSchema = new moongose.Schema(
  {
    projectId: {
      type: String,
      unique: true,
    },
    bugName: {
      type: String,
      unique: true,
    },
    status: {
      type: Number,
      //   unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    // checklists: [
    //   {
    //     type: checklist, // make a model for this
    //     required: false,
    //   },
    // ],
    comments: [
      {
        type: String,
        //date: Date,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const BugModel = moongose.model("bugs", BugSchema); // then name of the collection is "bugs"

export default BugModel;
