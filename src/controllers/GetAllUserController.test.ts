import { GetAllUserController } from "./GetAllUserController.js";
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { makeMockResponse } from "../utils/mocks/mockResponse.js";
import { makeMockRequest } from "../utils/mocks/mockRequest.js";

describe('GetAllUserController', () => {
    let mockGetAllUserService: any;
    let getAllUserController: GetAllUserController;

    beforeEach(() => {
        mockGetAllUserService = {
            execute: jest.fn()
        };
        getAllUserController = new GetAllUserController(mockGetAllUserService);
    });
    it('Deve retornar status 200 quando pegar todos os usuários', async () => {
        const mockUser = [
            {id: '1', nome: 'Algum usuário', email: 'algum@email.com'},
            {id: '2', nome: 'Outro usuário', email: 'outro@email.com'},
            {id: '3', nome: 'Mais um usuário', email: 'maisum@email.com'}
        ]
        mockGetAllUserService.execute.mockResolvedValue(mockUser);
        const request = makeMockRequest({});
        const response = makeMockResponse();
        await getAllUserController.handle(request, response);
        expect(response.state.status).toBe(200);
        expect(response.state.json).toEqual({users: mockUser});
        expect(mockGetAllUserService.execute).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar uma lista vazia se não houver usuários', async () => {
        mockGetAllUserService.execute.mockResolvedValue([]);
        const request = makeMockRequest({});
        const response = makeMockResponse();
        await getAllUserController.handle(request, response);
        expect(response.state.status).toBe(200);
        expect(response.state.json).toEqual({users: []});
    });
});