import { Request, Response, NextFunction } from "express";
import { STATUS } from "../utils/responseDefault";
import { UserModel } from "../models";

import { z } from "zod";
import { UserService } from "../service/userService";

export class userController {
    // Criar um novo usuário
    static async createUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        const { name, email, password, address, coordinates } = req.body; // Ajuste os campos conforme o modelo do UserModel

        try {
            // Validação básica
            const userData = userSchema.parse(req.body);
            if (userData.address && userData.coordinates) {
                return res.status(STATUS.BAD_REQUEST).json({
                    message: "Address and coordinates cannot be sent together"
                });
            }

            const existingUser = await UserService.getUserByEmail(email);
            if (existingUser) {
                return res.status(STATUS.CONFLICT).json({
                    message: "Email is already in use"
                });
            }

            // Criar e salvar o usuário no banco de dados
            const newUser = await UserService.createUser(
                name,
                email,
                password,
                address,
                coordinates
            );
            await newUser.save();

            res.status(STATUS.CREATED).json({
                message: "User created successfully",
                user: newUser
            });
        } catch (error) {
            next(error); // Passa o erro para o middleware de erro
        }
    }

    static async getUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        try {
            const { users, total } = await UserService.getUsers(page, limit);
            res.json({ rows: users, page, limit, total });
        } catch (error) {
            next(error);
        }
    }

    // Consultar usuário por ID
    static async getUserById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        const { id } = req.params;

        try {
            const user = await UserService.getUserById(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    // Atualizar usuário por ID
    static async updateUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        const { id } = req.params;

        try {
            const updatedUser = await UserService.updateUser(id, req.body);
            res.status(STATUS.UPDATED).json({
                message: "User updated successfully",
                user: updatedUser
            });
        } catch (error) {
            next(error);
        }
    }

    // // Deletar usuário por ID
    static async deleteUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        const { id } = req.params;

        try {
            const message = await UserService.deleteUser(id);
            res.status(STATUS.UPDATED).json(message);
        } catch (error) {
            next(error);
        }
    }
}
const userSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres."),
    email: z.string().email("Formato de e-mail inválido."),
    password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres."),
    phone: z.string().optional(),
    address: z.string().optional(),
    coordinates: z.tuple([z.number(), z.number()]).optional()
});
