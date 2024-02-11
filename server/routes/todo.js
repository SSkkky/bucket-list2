// routes/todo.js
const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// get, post
router.route('/data')
  .get(async (req, res) => {
    const data = await Todo.find({});
    res.send(data);
  })
  .post(async (req, res) => {
    const newItem = new Todo(req.body);
    const savedItem = await newItem.save();
    res.send(savedItem);
  });

  // put, delete (:id)
router.route('/data/:id')
.get(async (req, res) => {
  const data = await Todo.findOne({ id: req.params.id });
  res.send(data);
})
.put(async (req, res) => {
  const updatedItem = await Todo.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  res.send(updatedItem);
})
.delete(async (req, res) => {
  await Todo.findOneAndDelete({ id: req.params.id });
  res.send({ message: 'Item removed' });
});



module.exports = router;
