import { createError } from '../../../utils/handle-errors.js';
import { joiRegisterSchema, joiEditUserSchema } from '../joi-schema.js';
import User from './model.js';
import bcrypt from 'bcrypt';

export async function getAllUsers() {
    try {
        return await User.find();
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function getUserById(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        return user;
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function register(rawUser) {
    const joiError = joiRegisterSchema.validate(rawUser).error;
    if (joiError) throw createError("Joi", joiError);
    try {
        rawUser.password = await bcrypt.hash(rawUser.password, 10);
        const user = new User(rawUser);
        await user.save();
        return user;
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function login({ email, password }) {
    try {
        if (typeof email !== "string") throw new TypeError("Email must be a string");
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Password is incorrect");
        return user;
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function editUser(userId, rawUser) {
    const joiError = joiEditUserSchema.validate(rawUser).error;
    if (joiError) throw createError("Joi", joiError);
    try {
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            { $set: rawUser },
            { new: true },
        );
        return user;
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function toggleBusinessStatus(userId) {
    try {
        const user = await getUserById(userId);
        user.isBusiness = !user.isBusiness;
        await user.save();
        return user;
    } catch (error) {
        throw createError("Mongoose", error);
    }
};

export async function deleteUser(userId) {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (error) {
        throw createError("Mongoose", error);
    };
};