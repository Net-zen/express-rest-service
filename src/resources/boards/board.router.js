const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  await res.json(await boardService.getAll());
});

router.route('/:id').get(async (req, res) => {
  try {
    await res.json(await boardService.getById(req.params.id));
  } catch (err) {
    await res.status(404).send(err.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardService.create(new Board({ ...req.body }));
  await res.json(board);
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardService.update(req.params.id, req.body);
    await res.json(board);
  } catch (e) {
    await res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardService.remove(req.params.id);
  await res.json(board);
});

module.exports = router;
