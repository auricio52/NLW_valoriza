import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';
import "reflect-metadata";
import "express-async-errors"; // Para que o express consiga lidar com erros assíncronos (throw new Error)

import "./database";

const app = express();

app.use(express.json);
app.use(router);

// Middleware de tratamento de erro
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) { // Verifica se o erro é uma instância da classe Error que é retornada quando acontece alguma exceção
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(3000, () => {
    console.log("Ouvindo na porta 3000!");
});

