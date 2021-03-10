import { IsString } from "class-validator";

export class CreateEventDto{
    
    
    @IsString()
    Title: string;
    
    EventTime: string; // type of date in SQL
    
    PlaceID: number;//FK? for Place

}