const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('express-joi-validation').createValidator({});
const { userSchema } = require('../../common/validationschemas');
const authenticateToken = require('../../authentification/authentification');
require('express-async-errors');

router.route('/').get(authenticateToken, async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router
  .route('/:id')
  .get(
    authenticateToken,
    validator.params(userSchema.getUser),
    async (req, res) => {
      const user = await usersService.getById(req.params.id);
      res.json(User.toResponse(user));
    }
  );

router
  .route('/')
  .post(
    authenticateToken,
    validator.body(userSchema.createUser),
    async (req, res) => {
      const salt = await bcrypt.genSalt(10);
      const user = await usersService.create(
        new User({
          ...req.body,
          password: await bcrypt.hash(req.body.password, salt)
        })
      );
      res.json(User.toResponse(user));
    }
  );

router
  .route('/:id')
  .put(
    authenticateToken,
    validator.params(userSchema.updateUser.params),
    validator.body(userSchema.updateUser.body),
    async (req, res) => {
      const salt = await bcrypt.genSalt(10);
      const user = await usersService.update(req.params.id, {
        ...req.body,
        password: await bcrypt.hash(req.body.password, salt)
      });
      res.json(User.toResponse(user));
    }
  );

router
  .route('/:id')
  .delete(
    authenticateToken,
    validator.params(userSchema.deleteUser),
    async (req, res) => {
      await usersService.remove(req.params.id);
      res.sendStatus(204);
    }
  );

module.exports = router;
