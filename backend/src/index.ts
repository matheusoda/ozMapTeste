import "./database";
import app from "./server"; // Importa o servidor configurado

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
