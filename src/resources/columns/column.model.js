const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: String,
  order: Number
});

module.exports = columnSchema;
