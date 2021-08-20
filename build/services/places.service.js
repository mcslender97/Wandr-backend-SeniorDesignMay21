"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import placeModel from '../models/places.model';
const database_service_1 = __importDefault(require("./database.service"));
class PlaceService {
    constructor() {
        this.db = new database_service_1.default();
        this.places = this.db.getAllPlaces();
    }
    async findAllPlaces() {
        //   const places: Place[] = this.places;
        const places = await this.db.getAllPlaces();
        return places;
    }
    async findPlaceById(placeID) {
        // const findPlace: Place = this.places.find(place => place.id === placeId);
        const place = await this.db.findPlaceByID(placeID);
        // if (!findPlace) throw new HttpException(409, "You're not place");
        return place;
    }
    async showPlacesBySearchQuery(query) {
        //   const places: Place[] = this.places;
        const places = await this.db.showPlaceByLocationSearchQuery(query);
        return places;
    }
    async showEventsInAPlace(pid) {
        //   const events: Event[] = this.events;
        const events = await this.db.showEventByPlace(pid);
        return events;
    }
    async showEventsInAPlaceAtADate(pid, date) {
        //   const events: Event[] = this.events;
        const events = await this.db.showEventByPlaceInADate(pid, date);
        return events;
    }
}
exports.default = PlaceService;
//# sourceMappingURL=places.service.js.map