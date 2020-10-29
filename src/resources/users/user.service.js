const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = id => usersRepo.remove(id);

const getByLogin = user => usersRepo.getByLogin(user);

module.exports = { getAll, getById, create, update, remove, getByLogin };
