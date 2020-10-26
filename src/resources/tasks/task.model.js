const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  order: Number,
  description: String,
  userId: {
    type: String || null,
    default: null
  },
  boardId: {
    type: String || null,
    default: null
  },
  columnId: {
    type: String || null,
    default: null
  }
});

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;
