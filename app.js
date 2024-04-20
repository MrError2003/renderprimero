"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importar variables de entorno
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Importar módulos necesarios
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
// Inicializar la aplicación Express
const app = (0, express_1.default)();
// Configurar middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Usar express.json() en lugar de bodyParser.json()
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Conectar a MongoDB
mongoose_1.default.connect(process.env.MONGODB_HOST || "");
// Configurar el motor de vistas 
app.set("views", path_1.default.join(__dirname, "pages/views"));
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const auth_controller_1 = require("./api/controllers/auth.controller");
app.get("/home", auth_controller_1.verifyJWT, (req, res) => {
    res.render("home");
});
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
const api_routes_1 = __importDefault(require("./api/routes/api.routes"));
app.use("/api", api_routes_1.default);
// import pagesRoutes from "./pages/routes/pages.routes";
// app.use("/", pagesRoutes);
// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
