"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../service/user-service");
const express_validator_1 = require("express-validator");
const api_error_1 = __importDefault(require("../exceptions/api-error"));
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(api_error_1.default.BadRequest("Ошибка при валидации", errors.array()));
                }
                const { name, surname, email, password } = req.body;
                const userData = yield user_service_1.userService.registration(name, surname, email, password);
                res.cookie("refreshToken", userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: false,
                });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield user_service_1.userService.login(email, password);
                res.cookie("refreshToken", userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: false,
                });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield user_service_1.userService.logout(refreshToken);
                res.clearCookie("refreshToken");
                return res.json(token);
            }
            catch (e) {
                next(e);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = req.params.link;
                yield user_service_1.userService.activate(activationLink);
                return res.redirect(process.env.CLIENT_URL);
            }
            catch (e) {
                next(e);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield user_service_1.userService.refresh(refreshToken);
                res.cookie("refreshToken", userData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: false,
                });
                return res.json(userData);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.userController = new UserController();
