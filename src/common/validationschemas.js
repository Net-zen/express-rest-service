const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();

const userSchema = {
  getUser: Joi.object({
    id: id.required()
  }),
  createUser: Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
  }),
  updateUser: {
    params: Joi.object({
      id: id.required()
    }),
    body: Joi.object({
      name: Joi.string().optional(),
      login: Joi.string().optional(),
      password: Joi.string().optional(),
      id: id.optional()
    })
  },
  deleteUser: Joi.object({
    id: id.required()
  })
};

const boardSchema = {
  getBoard: Joi.object({
    id: id.required()
  }),
  createBoard: Joi.object({
    title: Joi.string().required(),
    columns: Joi.array().required()
  }),
  updateBoard: {
    params: Joi.object({
      id: id.required()
    }),
    body: Joi.object({
      id: id.optional(),
      title: Joi.string().optional(),
      columns: Joi.array().optional()
    })
  },
  deleteBoard: Joi.object({
    id: id.required()
  })
};

const taskSchema = {
  getTask: Joi.object({
    id: id.required(),
    boardId: id.required()
  }),
  createTask: {
    params: Joi.object({
      boardId: id.required()
    }),
    body: Joi.object({
      title: Joi.string().required(),
      order: Joi.number().required(),
      description: Joi.string().required(),
      userId: Joi.alternatives()
        .try(id, Joi.string(), null)
        .optional(),
      boardId: Joi.alternatives()
        .try(id, Joi.string(), null)
        .optional(),
      columnId: Joi.alternatives()
        .try(id, Joi.string(), null)
        .optional()
    })
  },
  updateTask: {
    params: Joi.object({
      id: id.required(),
      boardId: id.required()
    }),
    body: Joi.object({
      id: Joi.alternatives()
        .try(id, Joi.string(), null)
        .optional(),
      title: Joi.string().required(),
      order: Joi.number().required(),
      description: Joi.string().required(),
      userId: Joi.alternatives()
        .try(id, Joi.string(), null)
        .optional(),
      boardId: Joi.alternatives()
        .try(id, Joi.string(), null)
        .optional(),
      columnId: Joi.alternatives()
        .try(id, Joi.number(), null)
        .optional()
    })
  },
  deleteTask: Joi.object({
    id: id.required(),
    boardId: id.required()
  })
};

module.exports = { userSchema, boardSchema, taskSchema };
