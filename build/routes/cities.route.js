"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const cities_controller_1 = __importDefault(require("../controllers/cities.controller"));
class CitiesRoute {
    constructor() {
        this.path = '/cities';
        this.router = express_1.Router();
        this.citiesController = new cities_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use(`${this.path}`, auth_middleware_1.default);
        this.router.get(`${this.path}`, this.citiesController.getCitiesBySearchQuery);
        // this.router.get(`${this.path}/:id(\\d+)`, this.placesController.getPlaceById);
        // this.router.get(`${this.path}/search`, this.placesController.getPlacesBySearchQuery); //search places route
        this.router.get(`${this.path}/:id(\\d+)/places`, this.citiesController.getPlacesOfACity);
        //     this.router.post(`${this.path}`, validationMiddleware(CreatePlaceDto, 'body'), this.placesController.createPlace);
        //     this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreatePlaceDto, 'body', true), this.placesController.updatePlace);
        //     this.router.delete(`${this.path}/:id(\\d+)`, this.placesController.deletePlace);
    }
}
exports.default = CitiesRoute;
//# sourceMappingURL=cities.route.js.map