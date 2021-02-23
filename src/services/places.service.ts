import bcrypt from 'bcrypt';
//import { CreatePlaceDto } from '../dtos/places.dto';
import HttpException from '../exceptions/HttpException';
import { Place } from '../interfaces/places.interface';
//import placeModel from '../models/places.model';
import { isEmpty } from '../utils/util';
import DatabaseService from './database.service';

class PlaceService {
  // public places = placeModel;
  public places;
  private db = new DatabaseService();
  constructor() {
    this.places = this.db.getAllPlaces();
  }

  public async findAllPlaces(): Promise<Place[]> {
    //   const places: Place[] = this.places;
    const places = await this.db.getAllPlaces();
    return places;
  }

  public async findPlaceById(placeID: number): Promise<Place> {
    // const findPlace: Place = this.places.find(place => place.id === placeId);
    const place = await this.db.findPlaceByID(placeID);
    // if (!findPlace) throw new HttpException(409, "You're not place");

    return place;
  }
  public async showPlacesBySearchQuery(query: string): Promise<Place[]> {
    //   const places: Place[] = this.places;
    const places = await this.db.showPlaceByLocationSearchQuery(query);
    return places;
  }
//   public async createPlace(placeData: CreatePlaceDto): Promise<Place> {
//     if (isEmpty(placeData)) throw new HttpException(400, "You're not placeData");  
//     const findPlace = await this.db.findPlaceByEmail(placeData.email);
//     if (!(findPlace === null)) throw new HttpException(409, `You're email ${placeData.email} already exists`);
//     const hashedPassword = await bcrypt.hash(placeData.password, 10);
//     const createPlaceData: Place = {
//       id: this.places.length + 1,
//       ...placeData,
//       password: hashedPassword,
//       dob: null,
//       fullname: '',
//       gender: '',
//       phone: null,
//       email: '',
//     };

//     return createPlaceData;
//   }

//   public async updatePlace(placeId: number, placeData: Place): Promise<Place[]> {
//     if (isEmpty(placeData)) throw new HttpException(400, "You're not placeData");

    
//     const findPlace: Place = await this.db.findPlaceByID(placeId);
//     if (!findPlace) throw new HttpException(409, "You're not place");

//     const hashedPassword = await bcrypt.hash(placeData.password, 10);

//     const updatePlaceData: Place[] = await this.db.updatePlaceByID(placeId, placeData);

//     return updatePlaceData;
//   }

//   public async deletePlace(placeId: number): Promise<Place[]> {
//     const findPlace: Place = this.places.find(place => place.id === placeId);
//     if (!findPlace) throw new HttpException(409, "You're not place");

//     const deletePlaceData: Place[] = this.places.filter((place: { id: number }) => place.id !== findPlace.id);
//     return deletePlaceData;
//   }
 }

export default PlaceService;
