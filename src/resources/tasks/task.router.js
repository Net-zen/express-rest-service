const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const validator = require('express-joi-validation').createValidator({});
const { taskSchema } = require('../../common/validationschemas');
require('express-async-errors');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router
  .route('/:id')
  .get(validator.params(taskSchema.getTask), async (req, res) => {
    const task = await taskService.getById(req.params.id);
    res.json(Task.toResponse(task));
  });

router
  .route('/')
  .post(
    validator.params(taskSchema.createTask.params),
    validator.body(taskSchema.createTask.body),
    async (req, res) => {
      const task = await taskService.create(
        new Task({ ...req.body, boardId: req.params.boardId })
      );
      res.json(Task.toResponse(task));
    }
  );

router
  .route('/:id')
  .put(
    validator.params(taskSchema.updateTask.params),
    validator.body(taskSchema.updateTask.body),
    async (req, res) => {
      const task = await taskService.update(
        req.params.boardId,
        req.params.id,
        req.body
      );
      res.json(Task.toResponse(task));
    }
  );

router
  .route('/:id')
  .delete(validator.params(taskSchema.deleteTask), async (req, res) => {
    await taskService.remove(req.params.boardId, req.params.id);
    res.sendStatus(204);
  });

module.exports = router;
