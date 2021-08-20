"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("./database.service"));
class CitiesService {
    constructor() {
        this.db = new database_service_1.default();
    }
    async showCitiesBySearchQuery(query) {
        const cities = await this.db.showCitiesBySearchQuery(query);
        return cities;
    }
    async showPlacesInACity(cityid) {
        //   const events: Event[] = this.events;
        const places = await this.db.showPlaceByCityID(cityid);
        return places;
    }
}
exports.default = CitiesService;
//# sourceMappingURL=cities.service.js.map