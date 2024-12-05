export class SchoolingDto {
    id?: number;
    categoryId: number;
    creatorId: string; 
    title: string;
    description: string;
    priority: number;
    constructor(
        categoryId: number,
        creatorId: string,
        title: string,
        description: string,
        priority: number
    ){
        this.categoryId = categoryId
        this.creatorId = creatorId
        this.title = title
        this.description = description
        this.priority = priority
    }
}