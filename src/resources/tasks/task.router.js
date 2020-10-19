const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const { wrapper } = require('../../common/errorHandler');
const validator = require('express-joi-validation').createValidator({});
const { taskSchema } = require('../../common/validationschemas');

router.route('/').get(
  wrapper(async (req, res) => {
    res.json(await taskService.getAll(req.params.boardId));
  })
);

router.route('/:id').get(
  validator.params(taskSchema.getTask),
  wrapper(async (req, res) => {
    res.json(await taskService.getById(req.params.id));
  })
);

router.route('/').post(
  validator.body(taskSchema.createTask),
  wrapper(async (req, res) => {
    const task = await taskService.create(
      new Task({ ...req.body, boardId: req.params.boardId })
    );
    res.json(task);
  })
);

router.route('/:id').put(
  validator.params(taskSchema.updateTask.params),
  validator.body(taskSchema.updateTask.body),
  wrapper(async (req, res) => {
    const task = await taskService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(task);
  })
);

router.route('/:id').delete(
  validator.params(taskSchema.deleteTask),
  wrapper(async (req, res) => {
    await taskService.remove(req.params.boardId, req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
