import mongoose from "mongoose";
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });

export default async function connectToMongoDb() {
    try {
        const connectionString = process.env.MONGO_CONNECTION_STRING;
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDb:', mongoose.connections[0].host);
        return mongoose;
    } catch (error) {
        console.error('Error connecting to MongoDb', error);
    };
};