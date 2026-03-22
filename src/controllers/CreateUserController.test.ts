import AppDataSourceInit, { AppDataSource } from "../database/data-source.js";
import { CreateUserController } from "./CreateUserController.js";
import { describe, expect, it, beforeAll, afterAll, beforeEach } from '@jest/globals';
import type { Request } from 'express';
import { makeMockResponse } from "../utils/mocks/mockResponse.js";


describe('CreateUserController', () => {

    beforeAll(async () => {
        await AppDataSourceInit();
    });

    afterAll(async () => {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });

    beforeEach(async () => {
        const entities = AppDataSource.entityMetadatas;
        for (const entity of entities) {
            const repository = AppDataSource.getRepository(entity.name);
            await repository.clear();
        }
    });

    it('Deve retornar o id do usuário criado', async () => {
        const createUserController = new CreateUserController();

        const request = {
            body: {
                nome: 'Algum usuário',
                email: 'email@email.com'
            }
        } as Request;

        const response = makeMockResponse();

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(201);
        console.log(response.state.json);
    })
});