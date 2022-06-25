import Joi from 'joi';

const createCandidate = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    job_title: Joi.string().required(),
    phone: Joi.string().required(),
    avatar: Joi.string().required().uri(),
});

export default { createCandidate };
