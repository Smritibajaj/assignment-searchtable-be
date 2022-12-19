const mongoose = require("mongoose");
const CompanySchema = mongoose.Schema(
  {
    company: {
      type: Object,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("company", CompanySchema);
