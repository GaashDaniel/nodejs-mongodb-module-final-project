import bcrypt from 'bcrypt';
import User from '../../entities/users/mongodb/model.js';
import Card from '../../entities/cards/mongodb/model.js';
const models = { User, Card, };

export default async function () {
    const documentsByModel = {
        User: [
            {
                "name": {
                    "first": "Default",
                    "middle": "",
                    "last": "Admin",
                },
                "phone": "0501111111",
                "email": "admin@email.com",
                "password": await bcrypt.hash('A!a12345', 10),
                "image": {
                    "url": "",
                    "alt": "",
                },
                "address": {
                    "state": "State",
                    "country": "Country",
                    "city": "City",
                    "street": "Street",
                    "houseNumber": 5,
                    "zip": 123456,
                },
                "isAdmin": true,
                "isBusiness": true,
            },
            {
                "name": {
                    "first": "Default",
                    "middle": "Business",
                    "last": "User",
                },
                "phone": "0501111111",
                "email": "business-user@email.com",
                "password": await bcrypt.hash('A!a12345', 10),
                "image": {
                    "url": "",
                    "alt": "",
                },
                "address": {
                    "state": "State",
                    "country": "Country",
                    "city": "City",
                    "street": "Street",
                    "houseNumber": 5,
                    "zip": 123456,
                },
                "isAdmin": false,
                "isBusiness": true,
            },
            {
                "name": {
                    "first": "Default",
                    "middle": "Non-Business",
                    "last": "User",
                },
                "phone": "0501111111",
                "email": "non-business-user@email.com",
                "password": await bcrypt.hash('A!a12345', 10),
                "image": {
                    "url": "",
                    "alt": "",
                },
                "address": {
                    "state": "State",
                    "country": "Country",
                    "city": "City",
                    "street": "Street",
                    "houseNumber": 5,
                    "zip": 123456,
                },
                "isAdmin": false,
                "isBusiness": false,
            },
        ],
        Card: [
            {
                "title": "default card 1",
                "subtitle": "a default value for card 1 subtitle",
                "description": "a default value for card 1 description\na default value for card 1",
                "phone": "0501111111",
                "email": "card1@gmail.com",
                "web": "",
                "image": {
                    "url": "",
                    "alt": "",
                },
                "address": {
                    "state": "State",
                    "country": "Country",
                    "city": "City",
                    "street": "Street",
                    "houseNumber": 5,
                    "zip": 123456,
                },
                "likes": [],
                "user_id": null,
            },
            {
                "title": "default card 2",
                "subtitle": "a default value for card 2 subtitle",
                "description": "a default value for card 2 description\na default value for card 2",
                "phone": "0501111111",
                "email": "card2@gmail.com",
                "web": "",
                "image": {
                    "url": "",
                    "alt": "",
                },
                "address": {
                    "state": "State",
                    "country": "Country",
                    "city": "City",
                    "street": "Street",
                    "houseNumber": 5,
                    "zip": 123456,
                },
                "likes": [],
                "user_id": null,
            },
            {
                "title": "default card 3",
                "subtitle": "a default value for card 3 subtitle",
                "description": "a default value for card 3 description\na default value for card 3",
                "phone": "0501111111",
                "email": "card3@gmail.com",
                "web": "",
                "image": {
                    "url": "",
                    "alt": "",
                },
                "address": {
                    "state": "State",
                    "country": "Country",
                    "city": "City",
                    "street": "Street",
                    "houseNumber": 5,
                    "zip": 123456,
                },
                "likes": [],
                "user_id": null,
            },
        ],
    };

    async function getAdminId() {
        const email = documentsByModel.User[0].email;
        const { _id: userId } = await User.exists({ email });
        return String(userId);
    };

    for (const modelName in documentsByModel) {
        const Model = models[modelName];
        const rawDocuments = documentsByModel[modelName];
        for (const rawDocument of rawDocuments) {
            const { email } = rawDocument;
            const exists = await Model.exists({ email });
            if (exists) continue;
            if ("user_id" in rawDocument) {
                rawDocument.user_id = await getAdminId();
            };
            const document = new Model(rawDocument);
            await document.save();
        }
    };
};