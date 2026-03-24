import { AppDataSource } from "../database/data-source.js";
import { GetAllUserService } from "./GetAllUserService.js";
import { FakeData } from "../utils/fakeData/FakeData.js";
import { describe, expect, it, beforeEach } from '@jest/globals';
import { User } from "../entities/User.js";
import type { Request } from 'express';
import { makeMockResponse } from "../utils/mocks/mockResponse.js";

describe('GetAllUserService', () => {
    const userRepository = AppDataSource.getRepository(User);
    const fakeData = new FakeData(userRepository);
    const getAllUserService = new GetAllUserService(userRepository);
    it ('Deve retornar todos os usuários', async () => {
        await fakeData.execute();
        const result = await getAllUserService.execute();
        expect(result).toHaveLength(3);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]?.nome).toBe('Algum usuário');
    });
});