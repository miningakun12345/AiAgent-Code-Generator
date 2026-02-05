"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
class AuthService {
    async login(username, password) {
        // TODO: Implement login logic
        logger_1.default.info(`Login attempt for user: ${username}`);
        return { token: 'mock-token', user: { id: 1, username } };
    }
    async register(username, password) {
        // TODO: Implement register logic
        logger_1.default.info(`Register new user: ${username}`);
        return { id: 1, username };
    }
}
exports.AuthService = AuthService;
