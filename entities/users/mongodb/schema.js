import mongoose from "mongoose";
import { phone, email } from "../../../db/mongodb/common-validators.js";
import name from "../../../db/mongodb/common-schemas/name.js";
import image from "../../../db/mongodb/common-schemas/image.js";
import address from "../../../db/mongodb/common-schemas/address.js";

export default new mongoose.Schema({
    name: name,
    phone: phone,
    email: email,
    password: {
        type: String,
        required: true,
        trim: true,
    },
    image: image,
    address: address,
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});