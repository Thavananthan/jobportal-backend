const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ExpSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    role: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", ExpSchema);
