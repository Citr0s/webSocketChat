import { User } from "../Types/User";
import { Message } from "../Types/Message";

export class Room {

    public users: User[] = [];
    public name: string;
    public chat: Message[] = [];

    addUser(user: User) {

        this.users.push(user);
    }

    addMessage(message: Message) {

        this.chat.push(message);
    }
}