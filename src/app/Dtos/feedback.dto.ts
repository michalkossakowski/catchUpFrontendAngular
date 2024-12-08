export class FeedbackDto {
    id?: number;
    senderId?: string;
    receiverId?: string;
    title?: string;
    description?: string;
    resourceType?: number;
    resourceId?: number;
    schoolingTitle?: string
    senderName?: string;
    senderSurname?: string;
    receiverName?: string;
    receiverSurname?: string;

    constructor(
        senderId: string,
        receiverId: string,
        title: string,
        description: string,
        resourceType?: number,
        resourceId?: number,
        schoolingTitle?: string,
        senderName?: string,
        senderSurname?: string,
        receiverName?: string,
        receiverSurname?: string
    ){
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.title = title;
        this.description = description;
        this.resourceType = resourceType;
        this.resourceId = resourceId;
        this.schoolingTitle = schoolingTitle;
        this.senderName = senderName;
        this.senderSurname = senderSurname;
        this.receiverName = receiverName;
        this.receiverSurname = receiverSurname;
    }
}