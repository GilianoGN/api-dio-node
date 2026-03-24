import { UpdateUserController } from "./UpdateUserController.js";
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { makeMockResponse } from "../utils/mocks/mockResponse.js";
import { makeMockRequest } from "../utils/mocks/mockRequest.js";

describe('UpdateUserController', () => {
    let mockUpdateUserService: any;
    let updateUserController: UpdateUserController;

    beforeEach(() => {
        mockUpdateUserService = {
            execute: jest.fn()
        };
        updateUserController = new UpdateUserController(mockUpdateUserService);
    });

    it('Deve retornar status 200 ao atualizar com sucesso', async () => {
        const mockUser = {
            id: '1',
            nome: 'Algum usuário',
            email: 'algum@email.com'
        };
        mockUpdateUserService.execute.mockResolvedValue(mockUser);
        const request = makeMockRequest({
            params: { id: mockUser.id },
        });
        request.body = { nome: 'Outro usuário', email: 'outro@email.com' };
        const response = makeMockResponse();
        await updateUserController.handle(request, response);
        expect(response.state.status).toBe(200);
        expect(response.state.json).toEqual({ user: mockUser });
    });

    it('Deve retornar status 400 quando o ID for inválido ou ausente', async () => {
        const request = makeMockRequest({});
        const response = makeMockResponse();
        await updateUserController.handle(request, response);
        expect(response.state.status).toBe(400);
        expect(response.state.json).toEqual({ mensagem: "ID não informado" });
    });

    it('Deve retornar status 404 quando o usuário não existe no banco', async () => {
        mockUpdateUserService.execute.mockRejectedValue(new Error("Usuário não encontrado"));
        const request = makeMockRequest({ params: { id: 'id-errado' } });
        request.body = { nome: 'Teste' };
        const response = makeMockResponse();
        await updateUserController.handle(request, response);
        expect(response.state.status).toBe(404);
        expect(response.state.json).toEqual({ mensagem: "Usuário não encontrado" });
    });
});