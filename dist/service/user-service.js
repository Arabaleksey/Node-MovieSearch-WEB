"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userService = void 0;
const user_model_1 = require("../models/user-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid = __importStar(require("uuid"));
const mail_service_1 = require("./mail-service");
const token_service_1 = require("./token-service");
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const api_error_1 = __importDefault(require("../exceptions/api-error"));
class UserService {
    registration(name, surname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield user_model_1.UserModel.findOne({ email });
            if (candidate) {
                throw api_error_1.default.BadRequest(`Пользователь с почтовым адресом ${email} уже существует!`);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const activationLink = uuid.v4();
            const user = yield user_model_1.UserModel.create({
                name,
                surname,
                email,
                password: hashPassword,
                activationLink,
            });
            yield mail_service_1.mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const userDto = new user_dto_1.default(user);
            const tokens = token_service_1.tokenService.generateTokens(Object.assign({}, userDto));
            yield token_service_1.tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ activationLink });
            if (!user) {
                throw api_error_1.default.BadRequest("Некорректная ссылка активации!");
            }
            user.isActivated = true;
            yield user.save();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ email });
            if (!user) {
                throw api_error_1.default.BadRequest("Пользователь с таким email не найден");
            }
            const isPassEquals = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassEquals) {
                throw api_error_1.default.BadRequest("Неверный пароль");
            }
            const userDto = new user_dto_1.default(user);
            const tokens = token_service_1.tokenService.generateTokens(Object.assign({}, userDto));
            yield token_service_1.tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.tokenService.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.default.UnauthorizedError();
            }
            const userData = token_service_1.tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_1.default.UnauthorizedError();
            }
            const user = yield user_model_1.UserModel.findById(userData.id);
            const userDto = new user_dto_1.default(user);
            const tokens = token_service_1.tokenService.generateTokens(Object.assign({}, userDto));
            yield token_service_1.tokenService.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
}
exports.userService = new UserService();
