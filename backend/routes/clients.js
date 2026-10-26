import express from 'express';
import { createClientinDB, getClientsFromDB } from '../controllers/clientController';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const { search, page, limit } = req.query;

        const result = await getClientsFromDB(search, page, limit);
        res.json({ error: null, ...result});
    } catch (err) {
        res.status(400).json({error: err.message || 'Ошибка при получении списка клиентов'});
    }
});

router.post('/', async (req, res) => {
    try{
        const { name, phone, telegram, cars, comment } = req.body;
        
        const client = await createClientinDB(name, phone, telegram, cars, comment);

        res.status(201).json({ error: null, client });
    } catch(err) {
        res.status(400).json({error: err.message || 'Неизвестная ошибка при создании клиента'});
    }
});

export default router;