import mongoose from "mongoose";
import { phone, email, defaultValidation, url } from "../../../db/mongodb/common-validators.js";
import image from "../../../db/mongodb/common-schemas/image.js";
import address from "../../../db/mongodb/common-schemas/address.js";
import generateUniqueBizNumber from "../../../utils/generate-unique-biz-number.js";

const schema = new mongoose.Schema({
    title: defaultValidation,
    subtitle: defaultValidation,
    description: {
        ...defaultValidation,
        max: 1024,
    },
    phone: phone,
    email: email,
    web: url,
    image: image,
    address: address,
    bizNumber: {
        type: Number,
        min: 1_000_000,
        max: 9_999_999,
    },
    likes: [mongoose.Schema.Types.ObjectId],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

schema.pre('save', async function (next) {
    this.image.url ||= "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg";
    this.image.alt ||= "Business card image";
    this.bizNumber ||= await generateUniqueBizNumber();
    next();
});

export default schema;