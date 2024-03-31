import Joi from 'joi';
import { joiValidator } from "./joiValidator,js";

export const createUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      year: Joi.number().min(1900).max(new Date().getFullYear() - 18)
    })
    .validate(data)
);
