"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const db_1 = __importDefault(require("./config/db"));
const error_1 = __importDefault(require("./middlewares/error"));
const routes_1 = __importDefault(require("./routes"));
const subscription_1 = require("./helper/subscription");
exports.stripe = new stripe_1.default(process.env.STRIPE_KEY);
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "*",
}));
// app.use(morgan("dev"));
// Connect to Database
(0, db_1.default)();
(0, subscription_1.SubscriptionSeed)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send({ success: true }));
app.use("/api/v1/", routes_1.default);
// Middleware for Errors
app.use(error_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});
exports.default = app;
