import { User } from "../Types/User";
import { DateFormatter } from "../Helpers/DateFormatter";
import { Room } from "../Chat/Room";

export class Connection {

    public users: User[] = [];
    public room: Room = new Room();

    broadcast(data) {

        for (let i = 0; i < this.users.length; i++)
            this.users[i].client.send(data);
    };

    addUser(user: User) {

        let colours = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#795548', '#795548'];
        user.colour = colours[Math.floor(Math.random() * colours.length)];

        this.users.push(user);
    }

    getUser(client: any) {

        for (let i = 0; i < this.users.length; i++) {

            if (this.users[i].client === client)
                return this.users[i];
        }
    }

    removeUser(client: any) {

        for (let i = 0; i < this.users.length; i++) {

            if (this.users[i].client === client)
                this.users.splice(i, 1);
        }
    }

    handle(ws) {

        console.log('Client connected');

        this.addUser({
            name: 'Unknown',
            client: ws,
            colour: ''
        });

        this.room.addUser(this.getUser(ws));

        ws.send(JSON.stringify(this.room.chat));

        ws.on('message', function (message) {

            let newMessage = {
                date: new Date(),
                message: message,
                colour: this.getUser(ws).colour
            };

            this.room.addMessage(newMessage);

            console.log('[' + new DateFormatter(newMessage.date).toShortDate() + '] - ' + newMessage.message);

            this.broadcast(JSON.stringify(this.room.chat));
        });

        ws.on('close', function () {

            console.log('Client disconnected');

            this.removeUser(ws);
        });
    }
}