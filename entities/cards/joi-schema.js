import Joi from "joi";
import validator from "validator";

export default Joi.object({

    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string().required()
        .custom((value, helpers) => {
            if (validator.isMobilePhone(value)) return value;
            return helpers.message('business "phone" must be a valid phone number');
        }),
    email: Joi.string().required()
        .custom((value, helpers) => {
            if (validator.isEmail(value)) return value;
            return helpers.message('business "mail" must be a valid mail');
        }),
    web: Joi.string()
        .custom((value, helpers) => {
            if (value === "") return value;
            if (validator.isURL(value)) return value;
            return helpers.message('business "web" must be a valid url');
        })
        .allow(""),
    image: Joi.object().required()
        .keys({
            url: Joi.string()
                .custom((value, helpers) => {
                    if (value === "") return value;
                    if (validator.isURL(value)) return value;
                    return helpers.message('business "image" must be a valid url');
                })
                .allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
        }),
    address: Joi.object().required()
        .keys({
            state: Joi.string().allow(""),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number(),
        }),
    bizNumber: Joi.string().regex(/^[0-9]{7}$/),
    user_id: Joi.string(),
});