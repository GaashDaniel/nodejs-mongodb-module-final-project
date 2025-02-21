import { handleError } from '../utils/handle-errors.js';
import { createJwtToken } from '../utils/auth.js';
import { deleteUser, editUser, getAllUsers, getUserById, login, register, toggleBusinessStatus } from '../entities/users/mongodb/crud.js';

import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if (!req.userPrivileges.isAdmin) return res.sendStatus(401);
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const authorized = req.userPrivileges.isAdmin || userId === req.userPrivileges._id;
        if (!authorized) return res.status(401).send('Only the same user or admin can get user info');
        const user = await getUserById(userId);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await login({ email, password });
        const jwtToken = createJwtToken(user);
        res.send(jwtToken);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.post('/', async (req, res) => {
    try {
        const rawUser = req.body;
        if ('isAdmin' in rawUser) return res.status(400).send('You cannot set isAdmin');
        const user = await register(rawUser);
        const userSummary = {
            name: user.name,
            email: user.email,
            _id: user._id,
        };
        res.send(userSummary);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { _id: userIdFromToken } = req.userPrivileges;
        if (userId !== userIdFromToken) return res.status(401).send('Only the same user can edit user info');
        let user = await getUserById(userId);
        if (!user) return res.status(404).send('User not found');
        const rawUser = req.body;
        user = await editUser(userId, rawUser);
        res.send(user);
    } catch (error) {
        handleError(res, 500, error);
    }
});

router.patch('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { _id: userIdFromToken } = req.userPrivileges;
        if (userId !== userIdFromToken) return res.status(401).send('Only the same user can change business status');
        const user = await toggleBusinessStatus(userId);
        res.send(user);
    } catch (error) {
        handleError(res, 500, error);
    };
});

router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId !== req.userPrivileges._id && !req.userPrivileges.isAdmin) return res.status(401).send('Only the same user can delete the account');
        const user = await getUserById(userId);
        if (!user) return res.status(404).send('User not found');
        await deleteUser(userId);
        res.send(user);
    } catch (error) {
        handleError(res, 500, error);
    };
});

export default router;