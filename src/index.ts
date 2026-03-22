import 'reflect-metadata';
import express from 'express';
import { router } from './routes.js';
import AppDataSourceInit from './database/data-source.js';


const server = express();
server.use(express.json());
server.use(router);

AppDataSourceInit().then (() => {
    server.listen(5000, () => {
        console.log('Servidor ON na porta 5000');
    });
}).catch((error) => console.log("Erro ao conectar no banco:", error));