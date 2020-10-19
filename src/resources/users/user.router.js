const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { wrapper } = require('../../common/errorHandler');

router.route('/').get(
  wrapper(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrapper(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  wrapper(async (req, res) => {
    const user = await usersService.create(new User({ ...req.body }));
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrapper(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  wrapper(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
