// routes/bucketList.js
const express = require('express');
const BucketList = require('../models/BucketList');
const router = express.Router();

// get, post
router.route('/data')
  .get(async (req, res) => {
    const data = await BucketList.find({});
    res.send(data);
  })
  .post(async (req, res) => {
    const newItem = new BucketList(req.body);
    const savedItem = await newItem.save();
    res.send(savedItem);
  });

  // put, delete (:id)
router.route('/data/:id')
.get(async (req, res) => {
  const data = await BucketList.findOne({ id: req.params.id });
  res.send(data);
})
.put(async (req, res) => {
  const updatedItem = await BucketList.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  res.send(updatedItem);
})
.delete(async (req, res) => {
  await BucketList.findOneAndDelete({ id: req.params.id });
  res.send({ message: 'Item removed' });
});



module.exports = router;
