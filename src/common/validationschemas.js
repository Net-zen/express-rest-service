const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const userSchema = {
  getUser: Joi.object({
    id: Joi.objectId().required()
  }),
  createUser: Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
  }),
  updateUser: {
    params: Joi.object({
      id: Joi.objectId().required()
    }),
    body: Joi.object({
      name: Joi.string().optional(),
      login: Joi.string().optional(),
      password: Joi.string().optional(),
      id: Joi.objectId().optional()
    })
  },
  deleteUser: Joi.object({
    id: Joi.objectId().required()
  })
};

const boardSchema = {
  getBoard: Joi.object({
    id: Joi.objectId().required()
  }),
  createBoard: Joi.object({
    title: Joi.string().required(),
    columns: Joi.array().required()
  }),
  updateBoard: {
    params: Joi.object({
      id: Joi.objectId().required()
    }),
    body: Joi.object({
      id: Joi.objectId().optional(),
      title: Joi.string().optional(),
      columns: Joi.array().optional()
    })
  },
  deleteBoard: Joi.object({
    id: Joi.objectId().required()
  })
};

const taskSchema = {
  getTask: Joi.object({
    id: Joi.objectId().required(),
    boardId: Joi.objectId().optional()
  }),
  createTask: {
    params: Joi.object({
      boardId: Joi.objectId().required()
    }),
    body: Joi.object({
      title: Joi.string().required(),
      order: Joi.number().required(),
      description: Joi.string().required(),
      userId: Joi.alternatives()
        .try(Joi.objectId(), Joi.string(), null)
        .optional(),
      boardId: Joi.alternatives()
        .try(Joi.objectId(), Joi.string(), null)
        .optional(),
      columnId: Joi.alternatives()
        .try(Joi.objectId(), Joi.string(), null)
        .optional()
    })
  },
  updateTask: {
    params: Joi.object({
      id: Joi.objectId().required(),
      boardId: Joi.objectId().required()
    }),
    body: Joi.object({
      id: Joi.alternatives()
        .try(Joi.objectId(), Joi.string(), null)
        .optional(),
      title: Joi.string().required(),
      order: Joi.number().required(),
      description: Joi.string().required(),
      userId: Joi.alternatives()
        .try(Joi.objectId(), Joi.string(), null)
        .optional(),
      boardId: Joi.alternatives()
        .try(Joi.objectId(), Joi.string(), null)
        .optional(),
      columnId: Joi.alternatives()
        .try(Joi.objectId(), Joi.number(), null)
        .optional()
    })
  },
  deleteTask: Joi.object({
    id: Joi.objectId().required(),
    boardId: Joi.objectId().required()
  })
};

module.exports = { userSchema, boardSchema, taskSchema };
