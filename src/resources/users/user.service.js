const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.db.repository');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await taskService.unAssignTasksOfUser(id);
  return usersRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
