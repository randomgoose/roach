import uuid from 'react-uuid';


class Doc {
    constructor(uuid, content, author, timeCreated) {
        this.content = content;
        this.author = author;
        this.uuid = uuid;
        this.timeCreated = timeCreated;
    }
}