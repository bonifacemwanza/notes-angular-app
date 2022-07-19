import Joi from 'joi';

const create = Joi.object({
    text: Joi.string().required(),
});

const update = Joi.object({
    postId: Joi.string().required(),
    text: Joi.string().required()
});
const deleteNote = Joi.object({
    postId: Joi.string().required()
});
   
export default { create, update, deleteNote }