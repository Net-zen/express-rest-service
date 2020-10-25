const mongoose = require('mongoose');
const columnSchema = require('../columns/column.model');

const boardSchema = new mongoose.Schema({
  title: String,
  columns: [columnSchema]
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Boards', boardSchema);

module.exports = Board;
