import express from 'express';
import sequelize from '../../config/sequelize';
import cors from 'cors';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/healthcheck', (req, res) => {
    res.status(200).send({ message: 'Server is up and running!' });
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        app.listen(3000, () => {
            console.log('Server is running on port 3306');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
