const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  res.json(await taskService.getAll(req.params.boardId));
});

router.route('/:id').get(async (req, res) => {
  try {
    res.json(await taskService.getById(req.params.id));
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({ ...req.body, boardId: req.params.boardId })
  );
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await taskService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await taskService.remove(req.params.boardId, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(404);
  }
});

module.exports = router;
