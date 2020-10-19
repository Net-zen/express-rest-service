const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const { wrapper } = require('../../common/errorHandler');

router.route('/').get(
  wrapper(async (req, res) => {
    res.json(await boardService.getAll());
  })
);

router.route('/:id').get(
  wrapper(async (req, res) => {
    res.json(await boardService.getById(req.params.id));
  })
);

router.route('/').post(
  wrapper(async (req, res) => {
    const board = await boardService.create(new Board({ ...req.body }));
    res.json(board);
  })
);

router.route('/:id').put(
  wrapper(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.json(board);
  })
);

router.route('/:id').delete(
  wrapper(async (req, res) => {
    await boardService.remove(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
