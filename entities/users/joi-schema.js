import Joi from "joi";
import validator from "validator";

export const joiRegisterSchema = Joi.object({
    name: Joi.object().required()
        .keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
        }),
    phone: Joi.string().required()
        .custom((value, helpers) => {
            if (validator.isMobilePhone(value)) return value;
            return helpers.message('user "phone" mast be a valid phone number');
        }),
    email: Joi.string().required()
        .custom((value, helpers) => {
            if (validator.isEmail(value)) return value;
            return helpers.message('user "mail" mast be a valid mail');
        }),
    password: Joi.string().min(8).max(20).required()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[!@%$#^&*\-_]).*$/
        )
        .message(
            'user "password" must be 8-20 characters long and contain an uppercase letter, a lowercase letter, 4 digits and one of the following characters !@#$%^&*-'),
    image: Joi.object().required()
        .keys({
            url: Joi.string()
                .custom((value, helpers) => {
                    if (value === "") return value;
                    if (validator.isURL(value)) return value;
                    return helpers.message("user image mast be a valid url");
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
    isBusiness: Joi.boolean().required(),
});

export const joiEditUserSchema = Joi.object({
    name: Joi.object().required()
        .keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
        }),
    phone: Joi.string().required()
        .custom((value, helpers) => {
            if (validator.isMobilePhone(value)) return value;
            return helpers.message('user "phone" mast be a valid phone number');
        }),
    image: Joi.object().required()
        .keys({
            url: Joi.string()
                .custom((value, helpers) => {
                    if (value === "") return value;
                    if (validator.isURL(value)) return value;
                    return helpers.message("user image mast be a valid url");
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
    isBusiness: Joi.boolean(),
});