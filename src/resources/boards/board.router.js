const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const { wrapper } = require('../../common/errorHandler');
const validator = require('express-joi-validation').createValidator({});
const { boardSchema } = require('../../common/validationschemas');

router.route('/').get(
  wrapper(async (req, res) => {
    res.json(await boardService.getAll());
  })
);

router.route('/:id').get(
  validator.params(boardSchema.getBoard),
  wrapper(async (req, res) => {
    res.json(await boardService.getById(req.params.id));
  })
);

router.route('/').post(
  validator.body(boardSchema.createBoard),
  wrapper(async (req, res) => {
    const board = await boardService.create(new Board({ ...req.body }));
    res.json(board);
  })
);

router.route('/:id').put(
  validator.params(boardSchema.updateBoard.params),
  validator.body(boardSchema.updateBoard.body),
  wrapper(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.json(board);
  })
);

router.route('/:id').delete(
  validator.params(boardSchema.deleteBoard),
  wrapper(async (req, res) => {
    await boardService.remove(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
