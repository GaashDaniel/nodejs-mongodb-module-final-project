import mongoose from "mongoose";
import { url, defaultValidation } from "../common-validators.js"

export default new mongoose.Schema({
    url: url,
    alt: {
        ...defaultValidation,
        required: false,
        minLength: 0,
    },
});