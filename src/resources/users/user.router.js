const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  await res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    await res.json(User.toResponse(user));
  } catch (err) {
    await res.status(404).send(err.message);
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User({ ...req.body }));
  await res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    await res.json(User.toResponse(user));
  } catch (e) {
    await res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.remove(req.params.id);
  await res.json(User.toResponse(user));
});

module.exports = router;
