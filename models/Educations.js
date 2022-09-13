const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const EducSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    school: {
      type: String,
    },
    degree: {
      type: String,
    },

    fstudy: {
      type: String,
    },
    sYear: {
      type: Number,
      trim: true,
    },
    sMonth: {
      type: Number,
      trim: true,
    },
    eYear: {
      type: Number,
      trim: true,
    },
    eMonth: {
      type: Number,
      trim: true,
    },
    grade: {
      type: String,
    },
    activity: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Education", EducSchema);
