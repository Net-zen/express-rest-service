const router = require('express').Router();
const boardService = require('./board.service');
const taskRouter = require('../tasks/task.router');
const Board = require('./board.model');

router.use('/:boardId/tasks', taskRouter);

router.route('/').get(async (req, res) => {
  res.json(await boardService.getAll());
});

router.route('/:id').get(async (req, res) => {
  try {
    res.json(await boardService.getById(req.params.id));
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(
    new Board({
      title: req.body.title,
      columns: [
        {
          title: req.body.columns[0].title,
          order: req.body.columns[0].order
        },
        {
          title: req.body.columns[1].title,
          order: req.body.columns[1].order
        }
      ]
    })
  );
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardService.update(req.params.id, req.body);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardService.remove(req.params.id);
  res.json(board);
});

module.exports = router;
