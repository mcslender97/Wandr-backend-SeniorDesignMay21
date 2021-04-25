import { isEmpty } from '../utils/util';
import DatabaseService from './database.service';
import { eventMessage } from '../interfaces/eventMessages.interface'
import { privateMessage } from '../interfaces/privateMessages.interface'


class ChatService{
    private db = new DatabaseService();
    public async showAllMesssagesInAEvent(eventid: number): Promise<eventMessage[]> {
        const messages = await this.db.getAllEventMessages(eventid);
        return messages;
        
    }


}
export default ChatService