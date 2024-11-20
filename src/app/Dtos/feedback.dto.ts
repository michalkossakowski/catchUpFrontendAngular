export class FeedbackDto {
    id?: number;
    senderId?: string;
    reciverId?: string;
    title?: string;
    description?: string;
    origin?: string;

    constructor(
        senderId: string,
        reciverId: string,
        title: string,
        description: string,
        origin: string
    ){
        this.senderId = senderId;
        this.reciverId = reciverId;
        this.title = title;
        this.description = description;
        this.origin = origin;
    }
}