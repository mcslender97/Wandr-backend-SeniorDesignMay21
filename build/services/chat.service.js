"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("./database.service"));
class ChatService {
    constructor() {
        this.db = new database_service_1.default();
    }
    async showAllMesssagesInAEvent(eventid) {
        const messages = await this.db.getAllEventMessages(eventid);
        return messages;
    }
}
exports.default = ChatService;
//# sourceMappingURL=chat.service.js.map