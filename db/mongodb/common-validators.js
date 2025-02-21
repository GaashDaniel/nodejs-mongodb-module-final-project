import validator from 'validator';

export const defaultValidation = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
};

export const url = {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
        validator: validator.isURL,
        validator: value => {
            if (value === "") return true;
            return validator.isURL(value);
        },
    },
};

export const email = {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
        validator: validator.isEmail,
    }
};

export const phone = {
    type: String,
    required: true,
    validate: {
        validator: validator.isMobilePhone,
    },
};