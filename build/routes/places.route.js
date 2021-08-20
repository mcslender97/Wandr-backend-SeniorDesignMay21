"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const places_controller_1 = __importDefault(require("../controllers/places.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
class PlacesRoute {
    constructor() {
        this.path = '/places';
        this.router = express_1.Router();
        this.placesController = new places_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use(`${this.path}`, auth_middleware_1.default);
        this.router.get(`${this.path}`, this.placesController.getPlaces);
        this.router.get(`${this.path}/:id(\\d+)`, this.placesController.getPlaceById);
        this.router.get(`${this.path}/search`, this.placesController.getPlacesBySearchQuery); //search places route
        this.router.get(`${this.path}/:id(\\d+)/events`, this.placesController.getEventsOfAPlace);
        this.router.get(`${this.path}/:id(\\d+)/events/bydate`, this.placesController.getEventsOfAPlaceInADate);
        //     this.router.post(`${this.path}`, validationMiddleware(CreatePlaceDto, 'body'), this.placesController.createPlace);
        //     this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreatePlaceDto, 'body', true), this.placesController.updatePlace);
        //     this.router.delete(`${this.path}/:id(\\d+)`, this.placesController.deletePlace);
    }
}
exports.default = PlacesRoute;
//# sourceMappingURL=places.route.js.map