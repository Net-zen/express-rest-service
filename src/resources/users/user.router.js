const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('express-joi-validation').createValidator({});
const { userSchema } = require('../../common/validationschemas');
require('express-async-errors');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router
  .route('/:id')
  .get(validator.params(userSchema.getUser), async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  });

router
  .route('/')
  .post(validator.body(userSchema.createUser), async (req, res) => {
    const user = await usersService.create(new User({ ...req.body }));
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .put(
    validator.params(userSchema.updateUser.params),
    validator.body(userSchema.updateUser.body),
    async (req, res) => {
      const user = await usersService.update(req.params.id, req.body);
      res.json(User.toResponse(user));
    }
  );

router
  .route('/:id')
  .delete(validator.params(userSchema.deleteUser), async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(204);
  });

module.exports = router;
