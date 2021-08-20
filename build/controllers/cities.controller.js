"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cities_service_1 = __importDefault(require("../services/cities.service"));
class CitiesController {
    constructor() {
        this.citiesService = new cities_service_1.default();
        this.getCitiesBySearchQuery = async (req, res, next) => {
            try {
                let q = req.query.q;
                const findAllPlacesData = await this.citiesService.showCitiesBySearchQuery(q.toString());
                res.status(200).json(findAllPlacesData);
                console.log("findBySearchQuery");
            }
            catch (error) {
                next(error);
            }
        };
        this.getPlacesOfACity = async (req, res, next) => {
            try {
                const cityid = Number(req.params.id);
                const placesData = await this.citiesService.showPlacesInACity(cityid);
                res.status(200).json(placesData);
                console.log("findFromPlace");
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = CitiesController;
//# sourceMappingURL=cities.controller.js.map