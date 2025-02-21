import Card from '../entities/cards/mongodb/model.js';

export default async function generateUniqueBizNumber() {
    function generateBizNumber() {
        return 1_000_000 + Math.floor(Math.random() * 9_000_000);
    };
    while (true) {
        const bizNumber = generateBizNumber();
        const exists = await Card.exists({ bizNumber });
        if (!exists) return bizNumber;
    };
};