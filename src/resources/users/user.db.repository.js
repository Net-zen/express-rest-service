const { NOT_FOUND } = require('../../errors/errors');
const User = require('./user.model');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  const salt = await bcrypt.genSalt(10);
  User.create({
    login: 'admin',
    password: await bcrypt.hash('admin', salt)
  });
};

const getAll = async () => User.find({});

const getById = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  return user;
};

const create = user => User.create(user);

const update = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  if (!updatedUser) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  return updatedUser;
};

const remove = async id => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  return user;
};

const getByLogin = async user => User.findOne({ login: user.login });

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByLogin,
  createAdmin
};
