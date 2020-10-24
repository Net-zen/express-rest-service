const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  columns: {
    type: [{}],
    default: [
      {
        id: uuid,
        title: 'Backlog',
        order: 0
      }
    ]
  },
  _id: {
    type: String,
    default: uuid
  }
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Boards', boardSchema);

module.exports = Board;
