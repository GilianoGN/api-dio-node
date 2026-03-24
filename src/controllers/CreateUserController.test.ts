import { CreateUserController } from "./CreateUserController.js";
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import type { Request } from 'express';
import { makeMockResponse } from "../utils/mocks/mockResponse.js";

describe('CreateUserController', () => {
    let mockCreateUserService: any;
    let createUserController: CreateUserController;

    beforeEach(() => {
        mockCreateUserService = {
            execute: jest.fn()
        };
        createUserController = new CreateUserController(mockCreateUserService);
    });
    const response = makeMockResponse();

    it('Deve retornar status 201 ao criar um usuário', async () => {
        const request = {
            body: {
                nome: 'Algum usuário',
                email: 'algum@email.com'
            }
        } as Request;
        mockCreateUserService.execute.mockResolvedValue({
            id: '1',
            nome: 'Algum usuário',
            email: 'algum@email.com'
        });
        await createUserController.handle(request, response);
        expect(response.state.status).toBe(201);
        expect(response.state.json).toHaveProperty('user');
    });

    it('Deve retornar status 400 quando o nome não for informado', async () => {
        const request = {
            body: {
                nome: '',
                email: 'email@email.com'
            }
        } as Request;
        await createUserController.handle(request, response);
        expect(response.state.status).toBe(400);
        expect(mockCreateUserService.execute).not.toHaveBeenCalled();
    });

    it('Deve retornar status 201 ao criar um usuário sem email', async () => {
        const request = {
            body: {
                nome: 'Algum usuário',
                email: ''
            }
        } as Request;
        mockCreateUserService.execute.mockResolvedValue({
            id: '1',
            nome: 'Algum usuário',
            email: ''
        });
        await createUserController.handle(request, response);
        expect(response.state.status).toBe(201);
        expect(response.state.json).toHaveProperty('user');
    });

it('Deve retornar status 404 quando o service lançar um erro', async () => {
        const request = {
            body: {
                nome: 'Usuário Erro',
                email: 'erro@email.com'
            }
        } as Request;
        const response = makeMockResponse();
        mockCreateUserService.execute.mockRejectedValue(new Error("Erro interno"));
        await createUserController.handle(request, response);
        expect(response.state.status).toBe(404);
        expect(response.state.json).toEqual({ mensagem: "Erro interno" });
    });
});