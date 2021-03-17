import { isEmpty } from '../utils/util';
import DatabaseService from './database.service';
import { City } from '../interfaces/cities.interfaces'
import { Place } from '../interfaces/places.interface';

class CitiesService{
    private db = new DatabaseService();
    public async showCitiesBySearchQuery(query: string): Promise<City[]> {
        const cities = await this.db.showCitiesBySearchQuery(query);
        return cities;
    }
    public async showPlacesInACity(cityid: number): Promise<(Place & City)[]> {
        //   const events: Event[] = this.events;
        const places = await this.db.showPlaceByCityID(cityid);
        return places;
    }

}
export default CitiesService