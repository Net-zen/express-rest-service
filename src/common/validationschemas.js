const Joi = require('joi');

const uuid = Joi.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
);

const userSchema = {
  getUser: Joi.object({
    id: uuid.required()
  }),
  createUser: Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
  }),
  updateUser: {
    params: Joi.object({
      id: uuid.required()
    }),
    body: Joi.object({
      name: Joi.string().optional(),
      login: Joi.string().optional(),
      password: Joi.string().optional(),
      id: uuid.optional()
    })
  },
  deleteUser: Joi.object({
    id: uuid.required()
  })
};

const boardSchema = {
  getBoard: Joi.object({
    id: uuid.required()
  }),
  createBoard: Joi.object({
    title: Joi.string().required(),
    columns: Joi.array().required()
  }),
  updateBoard: {
    params: Joi.object({
      id: uuid.required()
    }),
    body: Joi.object({
      id: uuid.optional(),
      title: Joi.string().optional(),
      columns: Joi.array().optional()
    })
  },
  deleteBoard: Joi.object({
    id: uuid.required()
  })
};

const taskSchema = {
  getTask: Joi.object({
    id: uuid.required(),
    boardId: uuid.optional()
  }),
  createTask: {
    params: Joi.object({
      boardId: uuid.required()
    }),
    body: Joi.object({
      title: Joi.string().required(),
      order: Joi.number().required(),
      description: Joi.string().required(),
      userId: Joi.alternatives()
        .try(uuid, Joi.string(), null)
        .optional(),
      boardId: Joi.alternatives()
        .try(uuid, Joi.string(), null)
        .optional(),
      columnId: Joi.alternatives()
        .try(uuid, Joi.string(), null)
        .optional()
    })
  },
  updateTask: {
    params: Joi.object({
      id: uuid.required(),
      boardId: uuid.required()
    }),
    body: Joi.object({
      id: Joi.alternatives()
        .try(uuid, Joi.string(), null)
        .optional(),
      title: Joi.string().required(),
      order: Joi.number().required(),
      description: Joi.string().required(),
      userId: Joi.alternatives()
        .try(uuid, Joi.string(), null)
        .optional(),
      boardId: Joi.alternatives()
        .try(uuid, Joi.string(), null)
        .optional(),
      columnId: Joi.alternatives()
        .try(uuid, Joi.number(), null)
        .optional()
    })
  },
  deleteTask: Joi.object({
    id: uuid.required(),
    boardId: uuid.required()
  })
};

module.exports = { userSchema, boardSchema, taskSchema };
