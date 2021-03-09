import { IsString } from "class-validator";

export class CreateEventDto{
    
    EventId: number;
    @IsString()
    Title: string;
    CreatedAt: string; //timestamp
    EventTime: string; // type of date in SQL
    PlaceID: number;//FK? for Place
    UserID: number;
}