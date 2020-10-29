const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');
const validator = require('express-joi-validation').createValidator({});
const { boardSchema } = require('../../common/validationschemas');
const authenticateToken = require('../../authentification/authentification');
require('express-async-errors');

router.route('/').get(authenticateToken, async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router
  .route('/:id')
  .get(
    authenticateToken,
    validator.params(boardSchema.getBoard),
    async (req, res) => {
      const board = await boardService.getById(req.params.id);
      res.json(Board.toResponse(board));
    }
  );

router
  .route('/')
  .post(
    authenticateToken,
    validator.body(boardSchema.createBoard),
    async (req, res) => {
      const board = await boardService.create(new Board({ ...req.body }));
      res.json(Board.toResponse(board));
    }
  );

router
  .route('/:id')
  .put(
    authenticateToken,
    validator.params(boardSchema.updateBoard.params),
    validator.body(boardSchema.updateBoard.body),
    async (req, res) => {
      const board = await boardService.update(req.params.id, req.body);
      res.json(Board.toResponse(board));
    }
  );

router
  .route('/:id')
  .delete(
    authenticateToken,
    validator.params(boardSchema.deleteBoard),
    async (req, res) => {
      await boardService.remove(req.params.id);
      res.sendStatus(204);
    }
  );

module.exports = router;
