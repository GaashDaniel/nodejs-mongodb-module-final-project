import express from 'express';
import { corsMiddleware, loggerMiddleware } from './utils/app-middlewares.js';
import { assignUserPrivileges } from './utils/auth.js';
import { handleError } from './utils/handle-errors.js';
import usersApiRouter from './routers/users-api.js';
import cardsApiRouter from './routers/cards-api.js';
import connectToMongoDb from './db/mongodb/connect.js';
import insertInitialData from './db/mongodb/insert-initial-data.js';

await connectToMongoDb();
await insertInitialData();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(loggerMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(assignUserPrivileges);
app.use('/users', usersApiRouter);
app.use('/cards', cardsApiRouter);
app.get('*', (req, res) => {
    res.status(404).end();
});

app.use((err, req, res, next) => {
    const message = err || "Internal Server error";
    return handleError(res, 500, message);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});