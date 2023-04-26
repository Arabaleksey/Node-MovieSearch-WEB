"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.name = model.name;
        this.surname = model.surname;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}
exports.default = UserDto;
;
