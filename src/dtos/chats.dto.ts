import { IsString } from "class-validator";

export class EventMessageDto{       
    @IsString()
    Username: string;
    @IsString()
    Pfp: string; // type of date in SQL
    ID: number
    time_stamp: string; //datetime
    content: string;
    User_Event_ID: number;
}