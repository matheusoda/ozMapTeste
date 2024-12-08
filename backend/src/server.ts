// src/server.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import cors from "cors";
import { STATUS } from "./utils/responseDefault";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: err.message
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Exporta o app para testes
export default app;
