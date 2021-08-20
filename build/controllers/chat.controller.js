"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_service_1 = __importDefault(require("../services/chat.service"));
class ChatController {
    constructor() {
        this.chatService = new chat_service_1.default();
        this.getAllMessagesInAnEvent = async (req, res, next) => {
            try {
                let eventid = Number(req.params.eventid);
                const findAllEventMessagesData = await this.chatService.showAllMesssagesInAEvent(eventid);
                res.status(200).json(findAllEventMessagesData);
                console.log("findEventChat");
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = ChatController;
//# sourceMappingURL=chat.controller.js.map