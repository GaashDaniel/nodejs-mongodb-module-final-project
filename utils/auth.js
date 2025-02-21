import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export function createJwtToken(user) {
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
    };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
    return jwtToken;
};

export function verifyJwtToken(jwtToken) {
    try {
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        return payload;
    } catch (error) {
        return null;
    };
};

export function assignUserPrivileges(req, res, next) {
    try {
        req.userPrivileges = {
            _id: null,
            isAdmin: false,
            isBusiness: false,
        };
        const jwtToken = req.header("x-auth-token");
        if (!jwtToken) {
            const error = new Error("Please Login");
            error.status = 401;
            throw createError("Authentication", error);
        };
        const payload = verifyJwtToken(jwtToken);
        if (!payload) {
            const error = new Error("Unauthorized user");
            error.status = 401;
            throw createError("Authentication", error);
        };
        Object.assign(req.userPrivileges, payload);
    } catch (error) {
    } finally {
        return next();
    };
};