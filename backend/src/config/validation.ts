import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  APP_NAME: Joi.string().default('LifeOS Backend'),

  PORT: Joi.number().default(3000),

  API_PREFIX: Joi.string().default('api/v1'),

  DB_HOST: Joi.string().required(),

  DB_PORT: Joi.number().default(5432),

  DB_USERNAME: Joi.string().required(),

  DB_PASSWORD: Joi.string().allow('').required(),

  DB_DATABASE: Joi.string().required(),
});