import { isEmpty } from '../utils/util';
import DatabaseService from './database.service';
import { City } from '../interfaces/cities.interfaces'

class CitiesService{
    private db = new DatabaseService();
    public async showCitiesBySearchQuery(query: string): Promise<City[]> {
    const cities = await this.db.showCitiesBySearchQuery(query);
    return cities;
    }
}
export default CitiesService