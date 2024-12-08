export class TaskDto {
    id?: number;
    newbieId?: string;
    title?: string;
    description?: string;
    createdDate?: Date;
    dueDate?: Date;
    status?: string;
    priority?: number;
    creatorId?: string;
    rate?: number;

    constructor(
        id?: number,
        newbieId?: string,
        title?: string,
        description?: string,
        createdDate?: Date,
        dueDate?: Date,
        status?: string,
        priority?: number,
        creatorId?: string,
        rate?: number
    ){
        this.id = id;
        this.newbieId = newbieId;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.creatorId = creatorId;
        this.rate = rate;
    }
}