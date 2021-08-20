"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = exports.CreateUserDto = exports.LoginUserDto = void 0;
const class_validator_1 = require("class-validator");
class LoginUserDto {
}
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "Email", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "Password", void 0);
exports.LoginUserDto = LoginUserDto;
class CreateUserDto {
}
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Email", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Username", void 0);
__decorate([
    class_validator_1.IsPhoneNumber(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Phone", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Password", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Fullname", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Gender", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Dob", void 0);
exports.CreateUserDto = CreateUserDto;
class UserDto {
}
exports.UserDto = UserDto;
//# sourceMappingURL=users.dto.js.map