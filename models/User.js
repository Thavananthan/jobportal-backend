const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },

    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    cover: {
      type: String,
      trim: true,
      default:
        "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&h=300&q=80",
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    mobile: {
      type: Number,
      required: [true, "mobile is required"],
    },
    bio: {
      type: String,
    },

    education: {
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

    experience: {
      companyName: {
        type: String,
      },
      role: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);