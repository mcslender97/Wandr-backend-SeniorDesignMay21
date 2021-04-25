import { NextFunction, Request, Response } from 'express';
import { Query } from 'mysql';

import { Event } from '../interfaces/events.interface';

import { City } from '../interfaces/cities.interfaces';
import ChatService from '../services/chat.service';
import { eventMessage } from '../interfaces/eventMessages.interface';

class ChatController
{
    public chatService = new ChatService()
    public getAllMessagesInAnEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          let eventid = Number(req.params.eventid);
          const findAllEventMessagesData: eventMessage[] = await this.chatService.showAllMesssagesInAEvent(eventid);
    
            //res.status(200).json(findAllPlacesData);
            console.log("findEventChat")
        } catch (error) {
          next(error);
        }
  };

}
export default ChatController