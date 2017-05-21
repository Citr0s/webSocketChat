import { User } from "../Types/User";

export class Connection {

    public users: User[] = [];

    constructor() {
    }

    broadcast(data) {

        for (let i = 0; i < this.users.length; i++)
            this.users[i].client.send(data);
    };

    addUser(user: User) {

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
}