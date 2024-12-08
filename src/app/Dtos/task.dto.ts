export class TaskDto {
    id?: number;
    title?: string;
    description?: string;
    createdDate?: Date;
    dueDate?: Date;
    status?: string;
    priority?: number;
    assignedToUserId?: string;
    creatorId?: string;
    rate?: number;

    constructor(
        id?: number,
        title?: string,
        description?: string,
        createdDate?: Date,
        dueDate?: Date,
        status?: string,
        priority?: number,
        assignedToUserId?: string,
        creatorId?: string,
        rate?: number
    ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.assignedToUserId = assignedToUserId;
        this.creatorId = creatorId;
        this.rate = rate;
    }
}