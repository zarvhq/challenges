import * as Joi from 'joi';

export const schemaValidator = (body: any) => {
  const schema = Joi.object({
    jsonFilePath: Joi.string().required(),
    outputFilePath: Joi.string().required(),
  })
  return schema.validate(body);
}
