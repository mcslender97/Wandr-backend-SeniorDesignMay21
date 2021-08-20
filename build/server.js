"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const events_route_1 = __importDefault(require("./routes/events.route"));
const places_route_1 = __importDefault(require("./routes/places.route"));
const cities_route_1 = __importDefault(require("./routes/cities.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const database_service_1 = __importDefault(require("./services/database.service"));
function init() {
    new database_service_1.default()
        .importSQLDBQuery()
        .then(() => {
        const app = new app_1.default([new index_route_1.default(), new users_route_1.default(), new auth_route_1.default(), new events_route_1.default(), new places_route_1.default(), new cities_route_1.default(), new chat_route_1.default()]);
        app.listen();
    })
        .catch(e => {
        console.error(e);
        if (e.toString().includes("ECONNREFUSED")) {
            console.log('Retrying in 5 seconds');
            setTimeout(() => {
                init();
            }, 5000);
        }
    });
}
validateEnv_1.default();
init();
//automate: run SQL file here
//# sourceMappingURL=server.js.map