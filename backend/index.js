import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Бэкенд успешно запущен!');
});

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log(chalk.blue('Успешное подключение к MongoDB'));
    app.listen(PORT, ()=> {
        console.log(chalk.green(`Сервер запущен на порту ${PORT}`));
    });
}).catch((err) => {
    console.error(chalk.red('Ошибка подключения к MongoDB:', err.message));
});f