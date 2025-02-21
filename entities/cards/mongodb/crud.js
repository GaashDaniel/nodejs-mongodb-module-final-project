import { createError } from '../../../utils/handle-errors.js';
import joiSchema from '../joi-schema.js';
import Card from './model.js';

export async function getAllCards() {
    try {
        return await Card.find();
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function getMyCards(userId) {
    try {
        return await Card.find({ user_id: userId });
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function getCardById(cardId) {
    try {
        const card = await Card.findById(cardId);
        if (!card) throw new Error("Card not found");
        return card;
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function toggleLikeCard(cardId, userId) {
    try {
        const card = await getCardById(cardId);
        const likes = new Set(card.likes.map(objectId => objectId.toString()));
        if (!likes.has(userId)) likes.add(userId);
        else likes.delete(userId);
        card.likes = [...likes];
        await card.save();
        return card;
    } catch (error) {
        throw createError("Mongoose", error);
    }
};

export async function createNewCard(rawCard) {
    const joiError = joiSchema.validate(rawCard).error;
    if (joiError) throw createError("Joi", joiError);
    try {
        const card = new Card(rawCard);
        await card.save();
        return card;
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function editCard(cardId, rawCard) {
    const joiError = joiSchema.validate(rawCard).error;
    if (joiError) throw createError("Joi", joiError);
    try {
        const card = await Card.findByIdAndUpdate(
            { _id: cardId },
            { $set: rawCard },
            { new: true },
        );
        if (!card) throw new Error("Card not found");
        return card;
    } catch (error) {
        throw createError("Mongoose", error);
    };
};

export async function deleteCard(cardId) {
    try {
        return await Card.findByIdAndDelete(cardId);
    } catch (error) {
        throw createError("Mongoose", error);
    };
};