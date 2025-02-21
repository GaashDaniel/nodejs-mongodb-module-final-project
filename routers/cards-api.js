import { handleError } from '../utils/handle-errors.js';
import { getAllCards, getCardById, createNewCard, editCard, getMyCards, deleteCard, toggleLikeCard } from '../entities/cards/mongodb/crud.js';

import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cards = await getAllCards();
        res.send(cards);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.get('/my-cards', async (req, res) => {
    try {
        const cards = await getMyCards(req.userPrivileges._id);
        res.send(cards);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.get('/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = await getCardById(cardId);
        if (!card) return res.status(404).send('Card not found');
        res.send(card);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.post('/', async (req, res) => {
    try {
        const { isBusiness, isAdmin } = req.userPrivileges;
        if (!isBusiness && !isAdmin) return res.status(401).send("Only admin or business user can create a new card");
        const rawCard = req.body;
        rawCard.user_id = req.userPrivileges._id;
        const card = await createNewCard(rawCard);
        res.send(card);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.put('/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        let card = await getCardById(cardId);
        const { _id: userId } = req.userPrivileges;
        if (userId !== String(card.user_id)) return res.status(401).send("Only card owner can edit this card");
        const rawCard = req.body;
        card = await editCard(cardId, rawCard);
        res.send(card);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.patch('/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        const { _id: userId } = req.userPrivileges;
        if (!userId) return res.status(401).send("Only logged in users can like a card");
        const card = await toggleLikeCard(cardId, userId);
        res.send(card);
    } catch (error) {
        handleError(res, 500, error);
    }
});

router.delete('/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = await getCardById(cardId);
        const { _id: userId, isAdmin } = req.userPrivileges;
        if (userId !== card.user_id && !isAdmin) return res.status(401).send("Only admin or card owner can delete this card");
        await deleteCard(cardId);
        res.send(card);
    } catch (error) {
        handleError(res, 500, error);
    };
});

export default router;