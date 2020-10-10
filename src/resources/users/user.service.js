const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = async id => await usersRepo.getById(id);

const create = async user => await usersRepo.create(user);

const put = async (id, user) => await usersRepo.put(id, user);

const del = async id => await usersRepo.del(id);

module.exports = { getAll, getById, create, put, del };
