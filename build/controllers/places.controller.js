"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const places_service_1 = __importDefault(require("../services/places.service"));
class PlacesController {
    constructor() {
        this.placeService = new places_service_1.default();
        this.getPlaces = async (req, res, next) => {
            try {
                const findAllPlacesData = await this.placeService.findAllPlaces();
                res.status(200).json(findAllPlacesData);
                console.log("findAll");
            }
            catch (error) {
                next(error);
            }
        };
        this.getPlacesBySearchQuery = async (req, res, next) => {
            try {
                let q = req.query.q;
                const findAllPlacesData = await this.placeService.showPlacesBySearchQuery(q.toString());
                res.status(200).json(findAllPlacesData);
                console.log("findBySearchQuery");
            }
            catch (error) {
                next(error);
            }
        };
        this.getPlaceById = async (req, res, next) => {
            try {
                const placeId = Number(req.params.id);
                const findOnePlaceData = await this.placeService.findPlaceById(placeId);
                res.status(200).json(findOnePlaceData);
                console.log('findOne');
            }
            catch (error) {
                next(error);
            }
        };
        this.getEventsOfAPlace = async (req, res, next) => {
            try {
                const pid = Number(req.params.id);
                const findAllEventsData = await this.placeService.showEventsInAPlace(pid);
                res.status(200).json(findAllEventsData);
                console.log("findFromPlace");
            }
            catch (error) {
                next(error);
            }
        };
        this.getEventsOfAPlaceInADate = async (req, res, next) => {
            try {
                const pid = Number(req.params.id);
                let date = req.query.date.toString();
                const findAllEventsData = await this.placeService.showEventsInAPlaceAtADate(pid, date);
                res.status(200).json(findAllEventsData);
                console.log("findFromPlace");
            }
            catch (error) {
                next(error);
            }
        };
        // public createPlace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //   try {
        //     const placeData: CreatePlaceDto = req.body;
        //     const createPlaceData: Place = await this.placeService.createPlace(placeData);
        //     res.status(201).json({ data: createPlaceData, message: 'created' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public updatePlace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //   try {
        //     const placeId = Number(req.params.id);
        //     const placeData: Place = req.body;
        //     const updatePlaceData: Place[] = await this.placeService.updatePlace(placeId, placeData);
        //     res.status(200).json({ data: updatePlaceData, message: 'updated' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public deletePlace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        //   try {
        //     const placeId = Number(req.params.id);
        //     const deletePlaceData: Place[] = await this.placeService.deletePlace(placeId);
        //     res.status(200).json({ data: deletePlaceData, message: 'deleted' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
    }
}
exports.default = PlacesController;
//# sourceMappingURL=places.controller.js.map