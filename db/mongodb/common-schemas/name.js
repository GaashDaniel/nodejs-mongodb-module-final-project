import mongoose from "mongoose";
import { defaultValidation } from "../common-validators.js"

export default new mongoose.Schema({
    first: defaultValidation,
    middle: {
        ...defaultValidation,
        required: false,
        minLength: 0,
    },
    last: defaultValidation,
});