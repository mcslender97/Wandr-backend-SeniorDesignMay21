import { isEmpty } from '../utils/util';
import DatabaseService from './database.service';
import { eventMessage } from '../interfaces/eventMessages.interface';
import { privateMessage } from '../interfaces/privateMessages.interface';
import { EventMessageDto } from '../dtos/chats.dto'


class ChatService{
    private db = new DatabaseService();
    public async showAllMesssagesInAEvent(eventid: number): Promise<EventMessageDto[]> {
        const messages = await this.db.getAllEventMessages(eventid);
        return messages;
        
    }


}
export default ChatService