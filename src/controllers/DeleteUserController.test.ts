import { DeleteUserController } from "./DeleteUserController.js";
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { makeMockResponse } from "../utils/mocks/mockResponse.js";
import { makeMockRequest } from "../utils/mocks/mockRequest.js";

describe('DeleteUserController', () => {
    let mockDeleteUserService: any;
    let deleteUserController: DeleteUserController;

    beforeEach(() => {
        mockDeleteUserService = {
            execute: jest.fn()
        };
        deleteUserController = new DeleteUserController(mockDeleteUserService);
    });
    
    it('Deve retornar status 204 ao deletar um usuário', async () => {
        const mockId = "uuid-valido";
        mockDeleteUserService.execute.mockResolvedValue({ id: mockId});
        const request = makeMockRequest({ params: { id: mockId } });
        const response = makeMockResponse();
        await deleteUserController.handle(request, response);
        expect(response.state.status).toBe(204);
        expect(mockDeleteUserService.execute).toHaveBeenCalledWith(mockId);
    });

    it('Deve retornar status 400 quando o ID não for informado', async  () => {
        const request = makeMockRequest({});
        const response = makeMockResponse();
        await deleteUserController.handle(request, response);
        expect(response.state.status).toBe(400);
        expect(response.state.json).toEqual({ mensagem: "ID não informado" });
        expect(mockDeleteUserService.execute).not.toHaveBeenCalled();
    });

    it('Deve retornar status 404 quando o serviço lançar um erro', async () => {
        const mockId = "id-inexistente";
        mockDeleteUserService.execute.mockRejectedValue(new Error("Usuário não encontrado"));
        const request = makeMockRequest({
            params: { id: mockId }
        });
        const response = makeMockResponse();
        await deleteUserController.handle(request, response);
        expect(response.state.status).toBe(404);
        expect(response.state.json).toEqual({ mensagem: "Usuário não encontrado" });
        });
});