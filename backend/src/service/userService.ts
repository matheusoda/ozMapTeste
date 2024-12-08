import { UserModel } from "../models";

export class UserService {
    // Criação de um novo usuário
    static async createUser(
        name: string,
        email: string,
        password: string,
        address?: string,
        coordinates?: object
    ) {
        const user = new UserModel({
            name,
            email,
            password,
            address,
            coordinates
        });
        await user.save();

        return user;
    }

    // Paginação de usuários
    static async getUsers(page: number, limit: number) {
        const [users, total] = await Promise.all([
            UserModel.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            UserModel.countDocuments()
        ]);

        return { users, total };
    }

    // Buscar usuário por ID
    static async getUserById(id: string) {
        const user = await UserModel.findById(id).lean();
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    static async getUserByEmail(email: string) {
        return UserModel.findOne({ email }).lean();
    }

    // Atualizar usuário por ID
    static async updateUser(id: string, updates: any) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        user.set(updates);
        await user.save();
        return user;
    }

    // Deletar usuário por ID
    static async deleteUser(id: string) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        await user.deleteOne();
        return { message: "User deleted successfully" };
    }
}
