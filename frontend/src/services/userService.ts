import axios from "axios";

const API_URL = "http://localhost:3003/api/users";

export interface CreateUserPayload {
    name: string;
    email: string;
    password?: string;
    address?: string;
    coordinates?: [number, number];
}

export interface UpdateUserPayload {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    coordinates?: [number, number];
}

// Cria usuário
export const createUser = async (userData: CreateUserPayload) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

// Busca usuários
export const getUsersList = async (page: number, limit: number) => {
    const response = await axios.get(`${API_URL}`, {
        params: { page, limit }
    });
    return response.data;
};

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

// Atualiza usuário
export const updateUser = async (id: string, userData: UpdateUserPayload) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
};

// Deleta usuário
export const deleteUser = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
