import { IsString } from "class-validator";

export class CreateEventDto{
    
    
    @IsString()
    Title: string;   
    EventStartTime: string; // type of date in SQL
    EventEndTime: string; 
    PlaceID: number;//FK? for Place

}
export class UpdateEventDto{
    Title: string
    EventStartTime: string; // type of date in SQL
    EventEndTime: string; 
}