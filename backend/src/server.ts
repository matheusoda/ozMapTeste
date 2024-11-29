import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "./models";

const server = express(); // Instância principal do servidor
const router = express.Router(); // Instância do roteador

// Middleware para processar JSON
server.use(express.json());

const STATUS = {
    OK: 200,
    CREATED: 201,
    UPDATED: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
};

// Listar usuários
router.get(
    "/users",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        try {
            const [users, total] = await Promise.all([
                UserModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .lean(),
                UserModel.countDocuments()
            ]);

            res.json({
                rows: users,
                page,
                limit,
                total
            });
        } catch (error) {
            next(error); // Passando o erro para o middleware de erro
        }
    }
);

// Consultar usuário por ID
router.get(
    "/users/:id",
    async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ): Promise<void | any> => {
        const { id } = req.params;

        try {
            const user = await UserModel.findById(id).lean();
            if (!user) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json({ message: "User not found" });
            }

            res.json(user);
        } catch (error) {
            next(error); // Passando o erro para o middleware de erro
        }
    }
);

// Atualizar usuário por ID
router.put(
    "/users/:id",
    async (
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction
    ): Promise<void | any> => {
        const { id } = req.params;
        const update = req.body;

        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json({ message: "User not found" });
            }

            user.set(update);
            await user.save();

            res.status(STATUS.UPDATED).json({
                message: "User updated successfully",
                user
            });
        } catch (error) {
            next(error); // Passando o erro para o middleware de erro
        }
    }
);

// Use o roteador no servidor
server.use(router);

// Middleware para captura de erros
server.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
        console.error(err.stack);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
);

// Inicie o servidor na porta 3003
server.listen(3003, () => {
    console.log("Server is running on http://localhost:3003");
});
