// models/BucketList.js
const mongoose = require('mongoose');

const BucketListSchema = new mongoose.Schema({
  id: { type: String, required: true },
  state: { type: Boolean, default: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }
});

const BucketListModel = mongoose.model('Bucket', BucketListSchema);

module.exports = BucketListModel;
