import { IsString } from "class-validator";

export class CreateEventDto{       
    @IsString()
    Title: string;   
    EventStartTime: string; // type of date in SQL
    EventEndTime: string; 
    PlaceID: number;//FK? for Place

}
export class GenerateEventDto{       
    @IsString()
    Title: string;   
    EventStartTime: string; // type of date in SQL
    EventEndTime: string;
    CreatedAt: string;
    PlaceID: number;//FK? for Place
    UserID: number;

}
export class UpdateEventDto{
    Title: string
    EventStartTime: string; // type of date in SQL
    EventEndTime: string; 
}
export class CreateUserEventDto{
    EventId: number;
    UserID: number;
}
export class UserEventDto{
    ID: number
    EventId: number;
    UserID: number;
    JoinedAt: string;
}