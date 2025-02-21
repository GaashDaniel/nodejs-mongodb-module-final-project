import mongoose from "mongoose";
import { defaultValidation } from "../common-validators.js"

export default new mongoose.Schema({
    state: {
        type: String,
        maxLength: 256,
        trim: true,
    },
    country: defaultValidation,
    city: defaultValidation,
    street: defaultValidation,
    houseNumber: {
        type: Number,
        required: true,
        min: 1,
    },
    zip: {
        type: Number,
        default: 0,
    },
});