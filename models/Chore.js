const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChoreSchema = new Schema({
  taskName: {
    type: String,
    default: "",
  },
  taskDetail: {
    type: String,
    default: "",
  },
  user_id: {
    type: String,
    default: "",
  },
  group_id: {
    type: String,
    default: "",
  },
  dueDate: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  completeDate: {
    type: Date,
  },
  isDone: {
    type: Boolean,
    default: false
  },
  isRecurring: {
    type: Boolean,
  },
  icon: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Chore", ChoreSchema);
